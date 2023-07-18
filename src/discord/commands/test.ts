import Discord from "discord.js"
import { FacebookController } from "../../functions/facebook";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('test')
		.setDescription('lệnh dùng để thử nghiệm, và cũng là bộ khung để phát triển dự án'),
	async execute(interaction:any) {
		interaction.reply('Bot đã hoạt động');
		let fbinstance:FacebookController = FacebookController.getInstance()
		fbinstance.getUserByID("5692927767426478")
	},
};