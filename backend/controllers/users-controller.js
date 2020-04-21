const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Pesho',
    email: 'test@test.com',
    password: 'test'
  }
];

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;

  res.json({users});
}

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  
  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if(hasUser) {
    throw new HttpError('Could not create user, email already exist.', 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  }

  DUMMY_USERS.push(createdUser);
  res.status(201).json({user: createdUser});
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  
  if(!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user', 401);
  }

    res.json({message: 'Logged in!'});
  
}

module.exports = {
  login,
  signup,
  getUsers
}