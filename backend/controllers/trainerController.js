import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import Trainer from '../models/trainerSchema.js'

dotenv.config();

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
            const token = jwt.sign({ email: result.email, id: result._id }, process.env.TRAINERJWT_SECRET, { expiresIn: '1h' });
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
        const { email, password } = req.body;
        const oldTrainer = await Trainer.findOne({ email });

        if (!oldTrainer)
            return res.status(404).json({ message: "Trainer doesn't exist" })

        if (!oldTrainer.isVerified === true) {
            return res.status(400).json({ message: "Pending verification" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldTrainer.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ name: oldTrainer.fname, email: oldTrainer.email, id: oldTrainer._id }, process.env.TRAINERJWT_SECRET, { expiresIn: "1h" });

        
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        
        oldTrainer.availableSlots = generateDates(startDate.getFullYear(), startDate.getMonth());
        
        oldTrainer.save(function (error) {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Something went wrong' });
            }
        });
        
        function generateDates(year, month) {
            let date = new Date(year, month, 1);
            let endOfMonth = new Date(year, month + 1, 0);
            let dateArray = [];
        
            while (date <= endOfMonth) {
                for (let i = 0; i < 48; i++) {
                    let hour = i % 2 === 0 ? 5 : 6;
                    let minute = i % 2 === 0 ? 0 : 30;
                    let time = hour + ":" + minute;
                    let timePeriod = i < 24 ? "AM" : "PM";
                    let formattedDate = date.toLocaleDateString() + " " + time + " " + timePeriod;
                    dateArray.push(formattedDate);
                }
        
                date.setDate(date.getDate() + 1);
            }
        
            return dateArray;
        }
        res.status(200).json({ token: toke, status: 'Login success', trainer: oldTrainer })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

export const getProfile = async (req, res) => {
    console.log('trainer profile');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.find({ _id: trainerId })
        res.json(trainer)
    } catch (err) {
        console.log(err);
    }
}

export const addService = async (req, res) => {
    console.log('add service');
    try {
        const trainerId = req.params.id
        const newService = req.body.service
        const data = await Trainer.findOne({ _id: trainerId, service: { $in: [newService] } });
        if (data) {
            res.json({ error: 'Already Added' })
        } else {
            await Trainer.updateOne({ _id: trainerId }, { $push: { service: newService } });
            res.json({ status: 'ok', message: 'Added Successfully' })
        }
    } catch (err) {
        console.log(err);
    }
}

export const addTips = async (req, res) => {
    console.log('add tip');
    try {
        const trainerId = req.params.id
        const newTip = req.body.tips
        const data = await Trainer.findOne({ _id: trainerId, tips: { $in: [newTip] } });
        if (data) {
            res.json({ error: 'Already Added' })
        } else {
            await Trainer.updateOne({ _id: trainerId }, { $push: { tips: newTip } });
            res.json({ status: 'ok', message: 'Added Successfully' })
        }
    } catch (err) {
        console.log(err);
    }
}

export const addDescription = async (req, res) => {
    console.log('add description');
    try {
        const trainerId = req.params.id
        const newDescription = req.body.description
        const data = await Trainer.findOne({ _id: trainerId, description: { $eq: newDescription } });
        if (data) {
            res.json({ error: 'Already Added' })
        } else {
            await Trainer.updateOne({ _id: trainerId }, { $set: { description: newDescription } });
            res.json({ status: 'ok', message: 'Added Successfully' })
        }
    } catch (err) {
        console.log(err);
    }
}

export const addPrice = async (req, res) => {
    console.log('add description');
    try {
        const trainerId = req.params.id
        const newPrice = req.body.price
        const data = await Trainer.findOne({ _id: trainerId, price: { $eq: newPrice } });
        if (data) {
            res.json({ error: 'Already Added' })
        } else {
            await Trainer.updateOne({ _id: trainerId }, { $set: { price: newPrice } });
            res.json({ status: 'ok', message: 'Added Successfully' })
        }
    } catch (err) {
        console.log(err);
    }
}

export const editProfile = async (req, res) => {

    console.log('edit profile');
    // console.log(req.body);
    try {
        const trainerId = req.body.id
        const file = req.body.file1

        const data = await Trainer.findOne({ _id: trainerId });
        console.log(data);

        if (file) {
            const imageUrl = data.profileImage
            console.log(imageUrl);
            const publicId = imageUrl.match(/\/([^\/]*)$/)[1].split('.')[0];
            console.log(publicId);
            cloudinary.uploader.destroy(publicId, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                }
            });
        }

        const file1 = await cloudinary.uploader.upload(file, {
            folder: "trainers"
        })

        await Trainer.updateOne({ _id: trainerId }, { $set: { profileImage: file1.url } });
        res.json({ status: 'ok', message: 'Added Successfully' })

    } catch (err) {
        console.log(err);
    }

    //code to first delete the image
    // var imageUrl = 'https://res.cloudinary.com/your_cloud_name/image/upload/v1567891234/sample.jpg';
    // var publicId = imageUrl.match(/\/([^\/]*)$/)[1].split('.')[0];
    // cloudinary.v2.uploader.destroy(publicId, function (error, result) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }
    // });

}