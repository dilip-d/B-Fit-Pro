import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js'
import User from '../models/userSchema.js'
import Trainer from '../models/trainerSchema.js'
import dotenv from 'dotenv';

dotenv.config();

export const adminprotect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.ADMINJWT_SECRET);

      await Admin.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
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

      const decoded = jwt.verify(token, process.env.CLIENTJWT_SECRET);

      await User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
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

      const decoded = jwt.verify(token, process.env.TRAINERJWT_SECRET);
      
      await Trainer.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});
