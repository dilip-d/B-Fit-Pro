import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
import Trainer from '../models/trainerSchema.js'
import bookingModel from '../models/bookingSchema.js';
import Razorpay from 'razorpay'
import crypto from "crypto";
import moment from 'moment';
import 'moment-timezone';
import nodemailer from 'nodemailer';
import userOTPVerificationSchema from '../models/userOTPVerificationSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});

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
        const { email, password } = req.body;
        const oldUser = await User.findOne({ email });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" })

        if (oldUser.isVerified === false)
            return res.status(404).json({ message: "User is not verified" })

        if (oldUser.isBlocked === true)
            return res.status(404).json({ message: "User is blocked" })

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const toke = jwt.sign({ name: oldUser.fname, email: oldUser.email, id: oldUser._id }, process.env.CLIENTJWT_SECRET, { expiresIn: "3h" });
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

export const checkAvailability = async (req, res) => {
    console.log('in check availability');
    try {
        const trainerId = req.params.id
        console.log(trainerId);
        console.log(req.body);
        const { date, time } = req.body

        const startDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").toISOString();
        const momentEndDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").add(29, "days");
        const endDate = momentEndDate.toISOString();
        console.log(startDate);
        console.log(endDate);

        const count = await bookingModel.countDocuments({
            trainerId: trainerId,
            timing: time,
            $or: [
              { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
              { startDate: { $lte: endDate }, endDate: { $gte: endDate } }
            ]
          });

        console.log(count);
        if (count > 0) {
            res.json({ error: 'A booking already exists for this trainer and time.' });
        } else {
            res.json({ message: 'No booking found for this trainer and time.', id: trainerId, date: date, time: time });
        }
    } catch (err) {
        console.log(err);
    }
}

export const payment = async (req, res) => {
    console.log('in payment');
    try {
        const userId = req.params.id
        const { id, date, time } = req.body
        console.log(id, date, time);

        const user = await User.findById({ _id: userId })
        const trainer = await Trainer.findById({ _id: id })

        const startDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").toISOString();
        const momentEndDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").add(29, "days");
        const endDate = momentEndDate.toISOString();
        console.log(startDate);
        console.log(endDate);

        const booked = await bookingModel.create({
            clientId: user._id,
            trainerId: trainer._id,
            clientInfo: `${user.fname} ${user.lname}`,
            trainerInfo: `${trainer.fname} ${trainer.lname}`,
            startDate: startDate,
            endDate: endDate,
            timing: time,
            amount: trainer.price
        })

        const amount = trainer.price;
        await generateRazorpay(booked._id, amount, res)

    } catch (err) {
        console.log(err);
    }
}

export const generateRazorpay = async (id, amount, res) => {
    console.log('in generate rpay');
    try {
        console.log(id);
        console.log(amount);
        instance.orders.create(
            {
                amount: amount * 100,
                currency: 'INR',
                receipt: `${id}`,
                notes: {
                    key1: 'value3',
                    key2: 'value2',
                },
            }, (err, order) => {
                console.log(order);
                res.json({ status: true, order: order });
            })
    }
    catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        })
    }
}

export const verifyPayment = async (req, res) => {
    console.log('in verify payment');
    try {
        console.log(req.body);

        //creating hmac object
        let hmac = crypto.createHmac('sha256', process.env.key_secret);

        //Passing the data to be hashed
        hmac.update(req.body.res.razorpay_order_id + "|" + req.body.res.razorpay_payment_id);

        //creating the hmac in the required format
        const generated_signature = hmac.digest('hex');

        var response = { signatureIsValid: "false" }
        if (generated_signature === req.body.res.razorpay_signature) {
            response = { signatureIsValid: "true" }
            console.log("signatureIsvalid");

            changePaymentStatus(req.body.order, res)
            // res.json(response);
        } else {
            res.send(response);
        }

    } catch (err) {
        console.log(err);
    }
}

export const changePaymentStatus = async (req, res) => {
    console.log('in change payment status');
    console.log(req);
    try {
        await bookingModel.findOneAndUpdate({ _id: req.receipt }, {
            $set: {
                paymentStatus: 'Completed',
                serviceStatus: 'Active'
            }
        })
        console.log('status changed success');
        res.json({ status: true, message: 'Payment Successfull !' })
    }
    catch (error) {
        console.log('failed');
        res.json({ error: 'Payment Failed !' })
    }
}

export const getUserProfile = async (req, res) => {
    console.log('user profile');
    try {
        const userId = req.params.id
        const user = await User.find({ _id: userId })
        res.json(user)
    } catch (err) {
        console.log(err);
    }
}

export const getBookings = async (req, res) => {
    console.log('get bookings');
    try {
        const userId = req.params.id
        const user = await bookingModel.find({clientId: userId })
        console.log(user);
        res.json(user)
    } catch (err) {
        console.log(err);
    }
}