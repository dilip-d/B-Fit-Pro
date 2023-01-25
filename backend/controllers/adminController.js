import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import User from '../models/user.js'
import Trainer from '../models/trainer.js'

const secret = 'admin';

//admin
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
    console.log('in admin signin');
    try {
        const { email, password } = req.body;
        const oldAdmin = await Admin.findOne({ email });

        if (!oldAdmin)
            return res.status(404).json({ message: "Admin doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, oldAdmin.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ email: oldAdmin.email, id: oldAdmin._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ token: toke, status: 'Login success', admin: oldAdmin })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

//user
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
        res.json({ status: 'ok', block: true, clientDetails: user })
    } catch (err) {
        console.log(err);
    }
}

export const unblockUser = async (req, res) => {
    console.log('unblock user');
    try {
        const userId = req.params.id
        const user = await User.findByIdAndUpdate({ _id: userId }, { isBlocked: false })
        res.json({ status: 'ok', unBlock: true, clientDetails: user })
    } catch (err) {
        console.log(err);
    }
}

//trainer
export const activeTrainerInfo = async (req, res) => {
    console.log('find trainers');
    try {
        const trainers = await Trainer.find({ isVerified: true });
        console.log('found');
        console.log(trainers);
        res.json({ activetrainerDetails: trainers, status: 'ok' })
    } catch (err) {
        res.status(500).json(err);
    }
}

export const blockTrainer = async (req, res) => {
    console.log('block trainer');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.findByIdAndUpdate({ _id: trainerId }, { isBlocked: true })
        res.json({ status: 'ok', block: true, trainerDetails: trainer })
    } catch (err) {
        console.log(err);
    }
}

export const unBlockTrainer = async (req, res) => {
    console.log('unblock trainer');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.findByIdAndUpdate({ _id: trainerId }, { isBlocked: false })
        res.json({ status: 'ok', unBlock: true, trainerDetails: trainer })
    } catch (err) {
        console.log(err);
    }
}

export const approvalPendingTrainers = async (req, res) => {
    console.log('find trainers');
    try {
        const trainers = await Trainer.find({ isVerified: false });
        console.log('found');
        console.log(trainers);
        res.json({ trainerDetails: trainers, status: 'ok' })
    } catch (err) {
        res.status(500).json(err);
    }
}

export const rejectTrainer = async (req, res) => {
    console.log('reject trainer');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.findByIdAndUpdate({ _id: trainerId }, { isVerified: true })
        res.json({ status: 'ok', rejected: true, trainerDetails: trainer })
    } catch (err) {
        console.log(err);
    }
}

export const approveTrainer = async (req, res) => {
    console.log('approve trainer');
    try {
        const trainerId = req.params.id
        console.log(trainerId);
        const trainer = await Trainer.findByIdAndUpdate({ _id: trainerId }, { isVerified: true })
        res.json({ status: 'ok', approved: true, trainerDetails: trainer })
    } catch (err) {
        console.log(err);
    }
}