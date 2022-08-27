const { Schema, model } = require("mongoose")


const userSchema = new Schema({
    userID: String,
    isBlocked: Boolean,
    blockReason: String,
    blockExpiry: String,
    currentChatID: String
})

const chatSchema = new Schema({
    chatID: String,
    members: [String],
    chatMess: [{
        sender: String,
        messType: String,
        text: String,
        attachmentURL: String
    }]
})



const User = model('User', userSchema)
const Chat = model('Chat', chatSchema)



module.exports = { User, Chat }
