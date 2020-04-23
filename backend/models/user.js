const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  places: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

userSchema.plugin(uniqueValidator); // use this to guaranteed unique email

module.exports = mongoose.model('User', userSchema);