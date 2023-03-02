import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const videoConversationSchema = new Schema({
    members: {
        type: Array,
    }
}, {
    timestamps: true
});

export default mongoose.model('VideoConversation', videoConversationSchema);