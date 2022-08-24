const {FacebookControler,templateBuilder,messageBuilder} = require("../../functions/facebook")
const {User} = require("../../functions/mongooes")


async function handlePostbackEvent(mess,messenger){
    let userID = mess.sender.id
    let userInDB = await User.find({userID})
    console.log(userInDB)
    if(userInDB.length !== 0) return messenger.sendMessage(userID, new messageBuilder().addText("Tài khoản của bạn đã được xác thực từ trước đó, bạn không cần phải xác thực lại").message)
     
    let userRecord = new User({
        userID,isBlocked:false,
        blockReason:"",
        blokVaildThrow:"",
        currentChat:""
    })
    userRecord.save()

    messenger.sendMessage(userID, new messageBuilder().addText("Tài khoản của bạn đã được xác thực thành công, chào mừng bạn đã đén với NHH Chatible").message)


    messenger.sendMessage(userID, new messageBuilder().addText("Để tiếp tục. Hãy nhắn một nội dung bất kì ").message)
}

module.exports.run = handlePostbackEvent

