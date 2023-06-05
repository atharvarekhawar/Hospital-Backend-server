const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = async ()=>{
    await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Database Connected');
    })
    .catch((err)=>{
        console.log(err);
    })
}

