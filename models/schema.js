const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
const schema = mongoose.model('schema', user);

module.exports = schema;

function displayWelcomeMessage() {
    console.log("Welcome to the Customer Management System!");
}






