import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const secret = 'bfit';

export const signin = async (req, res) => {
    const { phone, password } = req.body;
    console.log(req.body);
    try {
        const oldUser = await User.findOne({ phone });
        console.log( oldUser);
        if (oldUser) {
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
            console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                const token = jwt.sign({ name: oldUser.fname, email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
                console.log('user login success');
                return res.json({ status: 'ok', user: token })
            }else{
                res.json({ status: 'error', user: false })
                console.log('login failed');
            }
        }
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

