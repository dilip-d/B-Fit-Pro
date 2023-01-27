import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
    name: {
        type: String
    },
    service: {
        type: String
    },
    price: {
        type: Number
    },
    paymentOption: {
        type: String
    },
    address: {
        type: String
    },
    zip: {
        type: Number
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    unique: {
        type: String
    },
    bookingStatus: {
        type: String, default: 'Under process'
    }
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking;