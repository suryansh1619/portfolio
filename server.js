const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolioRoutes')
const userRoutes = require('./routes/userRoutes')
const dbConfig = require('./config/db')


const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://portfolio-nine-sable-21.vercel.app" : "http://localhost:3000",
    credentials: true
}));
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});