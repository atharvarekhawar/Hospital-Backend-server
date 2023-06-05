const express = require('express')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const {dbConnect} = require('./config/database');
dbConnect();

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({error: 'Internal server error'});
  });

const routes = require('./routes/route')
app.use('/hospital',routes);

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
})