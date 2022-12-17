import Discord from "discord.js"

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('test')
		.setDescription('Test'),
	async execute(interaction:any) {
		interaction.reply('Pong!');
	},
};