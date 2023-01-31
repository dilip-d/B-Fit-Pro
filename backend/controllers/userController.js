import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
import Trainer from '../models/trainerSchema.js'
import bookingModel from '../models/bookingSchema.js';
// import { sendEmail } from '../utils/sendEmail.js';
import nodemailer from 'nodemailer'
import userOTPVerificationSchema from '../models/userOTPVerificationSchema.js';

const secret = 'bfit';

export const signup = async (req, res) => {
    console.log('in sign up');
    const { fname, lname, dob, gender, email, phone, password, weight, height } = req.body
    console.log(req.body);
    try {
        const oldUser = await User.findOne({ email });
        const extphone = await User.findOne({ phone });

        if (oldUser !== null && extphone !== null) {
            console.log('duplicate');
            return res.json({ status: 'error', error: "User already exists" })
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

            await sendOTPVerificationEmail(result, res)

            // res.status(201).json({ status :  'success', message: "An Email sent to your account please verify" });

            // const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
            console.log('signup success');
            // res.json({ status: 'success' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log('went wrong');
        console.log(error);
    }
};

const sendOTPVerificationEmail = async (result, res) => {
    console.log('in send otp');
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.PASS
            }
        });

        //hash the otp
        const saltRounds = 10

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = new userOTPVerificationSchema({
            userId: result._id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })

        //save the otp record
        await newOTPVerification.save()

        await transporter.sendMail({
            from: "dili.d61296@gmail.com",
            to: result.email,
            subject: "B-Fit Pro Email Verification",
            html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up</p><p>This OTP <b>expires in 1 hour</b>.</p>`
        });
        console.log("Email sent successfully");

        res.json({
            status: "pending",
            send: "Verification otp email sent",
            data: {
                userId: result._id,
                email: result.email,
            }
        })
    }
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
}

export const verifyOTP = async (req, res) => {
    console.log('in verify otp');
    try {
        const userId = req.params.id;
        let { otp } = req.body
        if (!userId || !otp) {
            res.json({ message: 'Empty otp details are not allowed' })
        } else {
            const userOTPVerificationRecords = await userOTPVerificationSchema.find({
                userId,
            });
            if (userOTPVerificationRecords.length <= 0) {
                //no records found
                res.json({ message: "Account record doesn't exist or has been verified already. Please sign up or log in" })
            } else {
                //user otp record exists
                const { expiresAt } = userOTPVerificationRecords[0]
                const hashedOTP = userOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    //user otp record has expired
                    await userOTPVerificationSchema.deleteMany({ userId });
                    res.json({ message: "OTP has expired. Please request again." })
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);

                    if (!validOTP) {
                        //supllied otp is wrong
                        res.json({ message: "Invalid OTP passed. Check your inbox." })
                    } else {
                        //success
                        await User.updateOne({ _id: userId }, { isVerified: true });
                        await userOTPVerificationSchema.deleteMany({ userId });
                        res.json({
                            status: 'Verified',
                            success: 'User email verified successfully'
                        })
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'Failed',
            message: 'Unable to verify'
        })
    }
}

export const resendOTP = async (req, res) => {
    console.log('in resend otp');
    try {
        const email = req.body.email

        if (!email)
            return res.json({ message: "Empty user details are not allowed" })

        const oldUser = await User.findOne({ email });


        if (!oldUser)
            return res.json({ message: "User doesn't exist" })

        if (oldUser.isVerified === true)
            return res.json({ message: "Already Verified Please do login !" })

        const userId = oldUser._id;
        //delete existing records and resend
        await userOTPVerificationSchema.deleteMany({ userId })
        sendOTPVerificationEmail(oldUser, res)
    }
    catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        })
    }
}

export const signin = async (req, res) => {
    console.log('in user login');
    try {
        const { phone, password } = req.body;
        const oldUser = await User.findOne({ phone });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" })

        if (oldUser.isVerified === false)
            return res.status(404).json({ message: "User is not verified" })

        if (oldUser.isBlocked === true)
            return res.status(404).json({ message: "User is blocked" })

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ name: oldUser.fname, email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        console.log('user login success');

        res.status(200).json({ token: toke, status: 'Login success', user: oldUser })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

export const trainerList = async (req, res) => {
    console.log('trainer list');
    try {
        const trainer = await Trainer.find({ isVerified: true })
        res.json(trainer)
    } catch (err) {
        console.log(err);
    }
}

export const trainerDetail = async (req, res) => {
    console.log('trainer Detail');
    try {
        const trainerId = req.params.id
        const trainer = await Trainer.find({ _id: trainerId })
        res.json(trainer)
    } catch (err) {
        console.log(err);
    }
}

export const bookTrainer = async (req, res) => {
    console.log('in book trainer');

    try {
        req.body.status = "pending"
        const newBooking = new bookingModel(req.body)
        await newBooking.save()
        const user = await User.findOne({ _id: req.body.userId })
        user.notification.push({
            type: 'New-appointment-request',
            message: `A new appointment Request from ${req.body.userInfo.name}`,
            onclickPath: '/user/bookings'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message: "Booked Successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while booking appointment" })
    }
}