//exporting a function that define a connection to mongo

const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(process.env.DB_URI);
    console.log('connected to mongo');
}

module.exports = main;