import Discord from "discord.js"
import { DiscordClient } from "../../functions/discord"

module.exports = {
    name:Discord.Events.InteractionCreate,
    once:false,
    execute: (interaction:any) => {
        if (!interaction.isChatInputCommand()) return;
        let client = DiscordClient.getInstance()
        let command = DiscordClient.commands.find(filter => filter.data.name);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}