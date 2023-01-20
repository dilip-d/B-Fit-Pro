import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Trainer from '../models/trainer.js'

const secret = 'trainer';

export const trainerSignup = async (req, res) => {
    const { fname, lname, dob, gender, email, phone, password } = req.body
    console.log(req.body);
    try {
        const oldTrainer = await Trainer.findOne({ email });
        const extphone = await Trainer.findOne({ phone });

        if (oldTrainer !== null && extphone !== null) {
            console.log('duplicate');
            return res.json({ status: 'error', error: "Duplicate phone number" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await Trainer.create({
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

export const trainerLogin = async (req, res) => {
    const { phone, password } = req.body;
    console.log(req.body);
    try {
        const oldTrainer = await Trainer.findOne({ phone });
        console.log( oldTrainer);
        if (oldTrainer) {
            const isPasswordCorrect = await bcrypt.compare(password, oldTrainer.password)
            console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                const token = jwt.sign({ name: oldTrainer.fname, email: oldTrainer.email, id: oldTrainer._id }, secret, { expiresIn: "1h" });
                console.log('user login success');
                return res.json({ status: 'ok', trainer: token })
            }else{
                res.json({ status: 'error', trainer: false })
                console.log('login failed');
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}