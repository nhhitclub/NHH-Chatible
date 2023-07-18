import Discord from "discord.js"

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('test')
		.setDescription('lệnh dùng để thử nghiệm, và cũng là bộ khung để phát triển dự án'),
	async execute(interaction:any) {
		interaction.reply('Bot đã hoạt động');
	},
};