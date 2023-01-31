import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    trainerId: {
        type: String,
        required: true
    },
    clientInfo: {
        type: String,
        required: true
    },
    trainerInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    time:{
        type : String,
        required: true
    }
}, { timestamps: true })

const bookingModel = mongoose.model('Booking', bookingSchema)
export default bookingModel;