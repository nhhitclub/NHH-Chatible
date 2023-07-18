import Discord, { EmbedBuilder } from "discord.js"
import { DiscordClient } from "../../functions/discord"

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('tc')
		.setDescription('thread create'),
        
	async execute(interaction:any) {
        const embed:EmbedBuilder = new EmbedBuilder()
        .setColor(0x0099FF)
        .addFields({
            name: 'Hi',
            value: 'Thread sent'
        });


        interaction.reply({embeds:[embed]})
	},
};