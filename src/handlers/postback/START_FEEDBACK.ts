import { FacebookController } from "../../functions/facebook"

export const START_FEEDBACK = async (mess: any) => {
    await FacebookController.getInstance().sendFeedback(mess.sender.id)
    
}