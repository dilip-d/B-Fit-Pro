import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import Trainer from '../models/trainer.js'

const secret = 'bfit';

export const signin = async (req, res) => {
    console.log('in user login');
    try {
        const { phone, password } = req.body;
        const oldUser = await User.findOne({ phone });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" })

        if (oldUser.isBlocked === true)
            return res.status(404).json({ message: "User is blocked" })

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ name: oldUser.fname, email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        console.log('user login success');

        res.status(200).json({ token: toke, status: 'Login success', user : oldUser })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

export const signup = async (req, res) => {
    const { fname, lname, dob, gender, email, phone, password, weight, height } = req.body
    console.log(req.body);
    try {
        const oldUser = await User.findOne({ email });
        const extphone = await User.findOne({ phone });

        if (oldUser !== null && extphone !== null) {
            console.log('duplicate');
            return res.json({ status: 'error', error: "Duplicate phone number" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({
                fname,
                lname,
                dob,
                gender,
                weight,
                height,
                email,
                phone,
                password: hashedPassword,
            })

            const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
            console.log('signup success');
            res.json({ status: 'success' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log('went wrong');
        console.log(error);
    }
};

export const trainerList = async (req, res) => {
    console.log('trainer list');
    try {
        const trainer = await Trainer.find({})
        res.json(trainer)
    } catch (err) {
        console.log(err);
    }
}

export const trainerDetail = async (req, res) => {
    console.log('trainer Detail');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.find({_id: trainerId})
        res.json(trainer)
    } catch (err) {
        console.log(err);
    }
}