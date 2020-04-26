const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next) => {
  let users;

  try{
    users = await User.find({}, '-password');
  } catch(err) {
    const error = new HttpError('Fetching users failed, please try again.', 500);
    return next(error);
  }

  res.json({users: users.map(user => user.toObject( {getters: true} ))});
}

const signup = async (req, res, next) => {
  const errors = validationResult(req); // make a validation 
  if(!errors.isEmpty()) {               // with express validator
   return next(
     new HttpError('Invalid inputs passed. Please check your data.', 422)
   )
  }

  const { name, email, password } = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch(err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  if(existingUser) {
    const error = new HttpError('User exist already, try with new data', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://img.icons8.com/plasticine/2x/user.png',
    password,
    places: []
  })

  try {
    await createdUser.save();
  } catch(err) {
    const error = new HttpError('Signing up failed, please try again!', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({getters: true}) });
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch(err) {
    const error = new HttpError('Logging in failed, please try again.', 500);
    return next(error);
  }

  if(!existingUser || existingUser.password !== password) { 
    const error = new HttpError('Invalid credentials, could not log you in', 401);
    return next(error);
  }

  res.json({message: 'Logged in!', user: existingUser.toObject({getters: true})});
  
}

module.exports = {
  login,
  signup,
  getUsers
}