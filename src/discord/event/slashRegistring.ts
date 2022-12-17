require("dotenv").config()
import Discord from "discord.js"
import { DiscordClient } from "../../functions/discord"

module.exports = {
    name:"ready",
    once:true,
    execute: async () => {

        console.log("tét")
        let rest:Discord.REST = new Discord.REST({version:"10"}).setToken(process.env.DISCORD_TOKEN)
        console.log(DiscordClient.commands)
        try {
            console.log(`Started refreshing ${DiscordClient.commands.length} application (/) commands.`);
            const data:any = await rest.put(
                Discord.Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                { 
                    body: DiscordClient.commands
                        .map(({filter}:any)  => filter)
                        .data.toJSON() 
                },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
        
    }
}