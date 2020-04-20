const { validationResult } = require('express-validator');

const User = require('../models/User');
const HttpError = require('../models/http-error');


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    return next(
      new HttpError('Signing up failed please try again.', 500)
    )
  }

  if (existingUser) {
    return next(
      new HttpError('User already exists, please login.', 422)
    )
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    places: []
  })

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed please try again.', 500);
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};

module.exports = {
  getUsers,
  signup,
  login
}