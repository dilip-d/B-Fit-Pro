import mongoose from 'mongoose';
// import pkg from 'validator';
// const { isEmail } = pkg;

const AdminSchema = mongoose.Schema({

    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter an email'],
        unique: true,
        // validate: [true, 'Please enter a valid email']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter a password'],
        minLength: [3, 'Minimum password length is 3 characters']
    },
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
