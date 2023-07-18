require("dotenv").config()
import Discord from "discord.js"
import { DiscordClient } from "../../functions/discord"

module.exports = {
    name:"ready",
    once:true,
    execute: async () => {

        let rest:Discord.REST = new Discord.REST({version:"10"}).setToken(process.env.DISCORD_TOKEN)
        try {
            //console.log(`Started refreshing ${DiscordClient.commands.length} application (/) commands.`);
            const data:any = await rest.put(
                Discord.Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                { 
                    body: DiscordClient.commands.map(data=> data.data)
                },
            );
            //console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
        
    }
}


