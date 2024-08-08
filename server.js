const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');
const portfolioRoutes = require('./routes/portfolioRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://your-production-frontend-url.com" : "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL, 
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
}));
app.set("trust proxy", 1);

const dbConfig = require('./config/db')
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});