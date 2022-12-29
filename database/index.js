const mongoose = require('mongoose');

const startConnectionDatabase=()=>{
    mongoose.connect(`${process.env.DB_URL}/${process.env.DB_USER}`);
}

mongoose.connection.on('error',(err)=>{
    if(err) console.log(`connection error: ${err.message}`);
})

mongoose.connection.on('connection',()=>{
    console.log(`connection successfully mongodb `);
})

mongoose.set('strictQuery', true);

module.exports=startConnectionDatabase