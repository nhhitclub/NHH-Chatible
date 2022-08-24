const {Schema,model} = require("mongoose")


const userSchema = new Schema({
    userID:String,
    isBlocked:Boolean,
    blockReason:String,
    blokVaildThrow:String,
    currentChat:String
})

module.exports.User = model('User', userSchema)


const chatSchema = new Schema({
    chatID:String,
    peopleInChat:[String],
    chatMess:[{
        sender:String,
        messType:String,
        text:String,
        attachmentURL:String
    }]
})

module.exports.User = model('User', userSchema)
