import { FacebookController } from "../../functions/facebook"
import { User } from "../../functions/mongooes"


export async function handlePostbackEvent(mess: any) {
    const userID = mess.sender.id
    const userInDB = await User.find({ userID })
    const facebookControllerInstance = FacebookController.getInstance();

    if (userInDB.length !== 0) 
        return await facebookControllerInstance.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực từ trước đó, bạn không cần phải xác thực lại")

    const userRecord = new User({
        userID, isBlocked: false,
        blockReason: null,
        blockExpiry: null,
        currentChat: ""
    })

    userRecord.save()

    await facebookControllerInstance.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực thành công, chào mừng bạn đã đén với NHH Chatible")
    await facebookControllerInstance.sendTextOnlyMessage(userID, "Để tiếp tục. Hãy nhắn một nội dung bất kì")

}

