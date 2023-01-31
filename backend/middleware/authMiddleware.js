import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js'
import User from '../models/userSchema.js'
import Trainer from '../models/trainerSchema.js'

export const adminprotect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

       await Admin.findOne(decoded.userId);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Autherized');
  }
});

export const Clientprotect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

       await User.findOne(decoded.userId);

      next();
    } catch (error) {
      console.log('failed token');
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Autherized');
  }
});

export const Trainerprotect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      await Trainer.findOne(decoded.trainerId);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Autherized');
  }
});
