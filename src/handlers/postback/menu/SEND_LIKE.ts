import { FacebookController } from "../../../functions/facebook"
import { Chat, User } from "../../../functions/database"

export default async function SEND_LIKE(mess: any) {
    const user = await User.findOne({ userID: mess.sender.id })
    const chat = await Chat.findOne({ members: user.userID })

    const chatMembers: Array<string> = chat.members
    const anotherMember: string = chatMembers[(chatMembers.indexOf(mess.sender.id) + 1) % 2]

    await FacebookController.getInstance().sendLikeIcon(anotherMember)
    await FacebookController.getInstance().sendTextOnlyMessage(mess.sender.id, '_[Đã gửi nút like]_')
}