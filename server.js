const express=require('express');
const bodyparser = require('body-parser');
const path =require('path');
const cors = require('cors');
const portfolioRoutes=require('./routes/portfolioRoutes')
const app=express();
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

const dbConfig=require('./config/db')
app.use('/api/portfolio',portfolioRoutes)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(5000,()=>{
    console.log('server is running on port 5000');
})