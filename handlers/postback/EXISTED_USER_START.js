const { User } = require("../../functions/mongooes")


async function handlePostbackEvent(messenger, mess) {
    const userID = mess.sender.id
    const userInDB = await User.find({ userID })

    if (userInDB.length !== 0) 
        return await messenger.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực từ trước đó, bạn không cần phải xác thực lại")

    const userRecord = new User({
        userID, isBlocked: false,
        blockReason: null,
        blockExpiry: null,
        currentChat: ""
    })

    userRecord.save()

    await messenger.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực thành công, chào mừng bạn đã đén với NHH Chatible")
    await messenger.sendTextOnlyMessage(userID, "Để tiếp tục. Hãy nhắn một nội dung bất kì")

}

module.exports = handlePostbackEvent;

