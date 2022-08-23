const {Schema,model} = require("mongoose")


const userSchema = new Schema({
    userID:{type:String},
    blockReason:{type:String}

})

module.exports.User = model('User', userSchema)
