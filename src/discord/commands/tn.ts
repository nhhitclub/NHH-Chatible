import Discord, { EmbedBuilder } from "discord.js"
import { ChatController } from "../../functions/chatroom";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('tn')
		.setDescription('t'),
        
	async execute(interaction: any) {
		
		const em:EmbedBuilder = new EmbedBuilder()
            .setColor(0x0099FF)
            .addFields({
                name: 'Bot is working normally 🤖',
                value: 'Beep~~ Bop~'
            });


        const hi = await ChatController.getInstance().findChatRecord('7a460f0e-184d-4de0-a88a-b434e6e15637');
        console.log(hi.members);
        await interaction.reply({embeds:[em]})
	}
};