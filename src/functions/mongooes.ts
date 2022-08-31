import { Schema, model } from "mongoose"


const userSchema: Schema = new Schema({
    userID: String,
    isBlocked: Boolean,
    blockReason: String,
    blockExpiry: String,
    currentChatID: String
})

const chatSchema: Schema = new Schema({
    chatID: String,
    members: [String],
    chatMess: [{
        sender: String,
        text: String,
        attachmentURL: String,
        emoji_ID:String
    }]
})



const User = model('User', userSchema)
const Chat = model('Chat', chatSchema)

export { User, Chat }
