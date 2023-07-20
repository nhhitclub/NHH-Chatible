import { User } from "../../functions/database"

require("dotenv").config()


module.exports = {
    name:"ready",
    once:true,
    execute: async () => {
        const user = await User.findOne({userID:"system"})
        if(!user){
            const sys_user = new User({
                userID: "system",
                role: "admin",
                currentChatID: "",
                displayName: "[Tài khoản hệ thống]",
                avatarURl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJiKZwaPPDwtyIU3THO-T4inOzcwXwUADoiJZLT9Flik2D1N8LDBOecpy805yc6p6nmYE&usqp=CAU"
            })
            await sys_user.save()
        }
    }
}


