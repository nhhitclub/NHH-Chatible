const {FacebookControler,templateBuilder,messageBuilder} = require("../../functions/facebook")
const {User} = require("../../functions/mongooes")


async function handlePostbackEvent(mess){
    let userID = mess.sender.id
    let userInDB = await User.find({userID})
    if(userInDB !== []) return new Error("NOT A NEW MEMBERS")  
    let userRecord = new User({
        userID,isBlocked:false
    })
    userRecord.save()
    
}

module.exports.run = handlePostbackEvent
