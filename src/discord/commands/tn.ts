import Discord, { EmbedBuilder } from "discord.js"

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


        await interaction.reply({embeds:[em]})
	}
};