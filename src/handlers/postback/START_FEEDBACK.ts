import { FacebookController } from "../../functions/facebook"

export default async function START_FEEDBACK(mess: any) {
    await FacebookController.getInstance().sendFeedback(mess.sender.id)
    
}