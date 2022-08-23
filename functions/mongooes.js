const {Schema,model} = require("mongoose")


const userSchema = new Schema({
    userID:String,
    isBlocked:Boolean,
    blockReason:String,
    blokVaildThrow:String

})

module.exports.User = model('User', userSchema)
