import mongoose from 'mongoose'
// import  isEmail  from 'validator'

const trainerSchema = mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: [true, 'Please enter first name'],
        minLength: [2, 'Name is too short!']
    },
    lname: {
        type: String,
        trim: true,
        required: [true, 'Please enter last name '],
        minLength: 1
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter an email'],
        unique: true,
        // validate: [ true,'Please enter a valid email']
    },
    phone: {
        type: Number,
        trim: true,
        required: [true, 'Please enter the phone number'],
        minLength: 10,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter a password'],
        minLength: [3, 'Minimum password length is 3 characters']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    address: [{
        name: { type: String },
        mobile: { type: Number },
        address: { type: String },
        country: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    }],
    profileImage: {
        type: String,
        default: 'null',
        required: true
    },
    certificateImage: {
        type: String,
        dafault: 'null',
        required: true
    },
    link: {
        type: String,
        default: 'null',
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    },
    tips: {
        type: [String]
    },
    service: {
        type: [String]
    },
    price: {
        type: Number,
        trim: true
    }
}, { timestamps: true })

const Trainer = mongoose.model('Trainer', trainerSchema)
export default Trainer;