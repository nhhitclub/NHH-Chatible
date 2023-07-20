import { FacebookController } from "../../functions/facebook"
import { User } from "../../functions/database"


export default async function EXISTED_USER_START(mess: any) {
    const userID = mess.sender.id
    const userInDB = await User.find({ userID })
    const facebookControllerInstance = FacebookController.getInstance();

    if (userInDB.length !== 0) 
        return await facebookControllerInstance.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực từ trước đó, bạn không cần phải xác thực lại")

    let otherInfo = await facebookControllerInstance.getUserByID(userID)
    const userRecord = new User({
        userID, 
        role: "user",
        currentChatID: "",
        displayName:otherInfo.name,
        avatarURL:otherInfo.profile_pic
    })

    await userRecord.save()

    await facebookControllerInstance.sendTextOnlyMessage(userID, "Tài khoản của bạn đã được xác thực thành công, chào mừng bạn đã đến với NHH Chatible")
    await facebookControllerInstance.sendTextOnlyMessage(userID, "Để tiếp tục. Hãy nhắn một nội dung bất kì")

}

