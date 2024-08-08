const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');
const portfolioRoutes = require('./routes/portfolioRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

// app.use(morgan('combined')); 
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://portfolio-nine-sable-21.vercel.app",
    credentials: true
}));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
    })
);

app.set("trust proxy", 1);
app.use(express.json());

const PORT = process.env.PORT || 5000;
const dbConfig = require('./config/db')
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/user/', userRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})