import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import Trainer from '../models/trainer.js'

dotenv.config();

const secret = 'trainer';

// Config
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
})

export const trainerSignup = async (req, res) => {
    console.log('in trainer signup');
    try {
        const values = req.body.values
        console.log(values);
        const ytUrl = values.link;
        values.link = ytUrl.replace('/watch?v=', '/embed/');
        console.log(values.link);

        const profileImage = req.body.file1
        const certificateImage = req.body.file2

        const oldTrainer = await Trainer.findOne({ email: values.email });
        const extphone = await Trainer.findOne({ phone: values.phone });

        if (oldTrainer !== null && extphone !== null) {
            console.log('duplicate');
            return res.json({ status: 'error', error: "Duplicate phone number" })
        } else {
            const hashedPassword = await bcrypt.hash(values.password, 12);

            const file1 = await cloudinary.uploader.upload(profileImage, {
                folder: "trainers"
            })
            console.log(file1);
            const file2 = await cloudinary.uploader.upload(certificateImage, {
                folder: 'certificates'
            })
            console.log(file2);

            const result = await Trainer.create({
                fname: values.fname,
                lname: values.lname,
                dob: values.dob,
                gender: values.gender,
                email: values.email,
                phone: values.phone,
                password: hashedPassword,
                profileImage: file1.url,
                certificateImage: file2.url,
                link: values.link
            })
            const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
            console.log('trainer signup success');
            res.json({ status: 'success' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log('went wrong');
        console.log(error);
    }
};

export const trainerLogin = async (req, res) => {
    console.log('in trainer Login');
    try {
        const { phone, password } = req.body;
        const oldTrainer = await Trainer.findOne({ phone });

        if (!oldTrainer)
            return res.status(404).json({ message: "Trainer doesn't exist" })

        if (!oldTrainer.isVerified === true) {
            return res.status(400).json({ message: "Pending verification" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldTrainer.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ name: oldTrainer.fname, email: oldTrainer.email, id: oldTrainer._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ token: toke, status: 'Login success', trainer: oldTrainer })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}