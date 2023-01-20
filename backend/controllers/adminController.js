import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import User from '../models/user.js'

const secret = 'admin';

export const adminSignup = async (req, res) => {
    const { email, password } = req.body
    try {
        const oldAdmin = await Admin.findOne({ email });

        if (oldAdmin) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Admin.create({
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
};

export const adminSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldAdmin = await Admin.findOne({ email });
        if (oldAdmin) {
            const isPasswordCorrect = await bcrypt.compare(password, oldAdmin.password)
            if (isPasswordCorrect) {
                const token = jwt.sign({ email: oldAdmin.email, id: oldAdmin._id }, secret, { expiresIn: "1h" });
                return res.json({ status: "ok", user: token });
            }else{
                res.json({ status: 'error', user: false })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const userInfo = async (req, res) => {
    console.log('find user');
    try {
        const users = await User.find();
        console.log('found');
        res.json({ clientDetails: users, status: 'ok' })
    } catch (err) {
        res.status(500).json(err);
    }
}

export const blockUser = async (req, res) => {
    console.log('block user');
    try {
        const userId = req.params.id
        const user = await User.findByIdAndUpdate({ _id: userId }, { isBlocked: true })
        res.json({ status: 'ok', block: true, userDetails: user })
    } catch (err) {
        console.log(err);
    }
}

export const unblockUser = async (req, res) => {
    console.log('unblock user');
    try {
        const userId = req.params.id
        const user = await User.findByIdAndUpdate({ _id: userId }, { isBlocked: false })
        res.json({ status: 'ok', unBlock: true, userDetails: user })
    } catch (err) {
        console.log(err);
    }
}