import Discord from "discord.js"
import { ChatControler } from "../../functions/chatroom";
import { MessageType, ChatType } from "../../functions/interface";
import { DiscordClient } from "../../functions/discord";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('test')
		.setDescription('lệnh dùng để thử nghiệm, và cũng là bộ khung để phát triển dự án'),
	async execute(interaction:any) {
		interaction.reply('Bot đã hoạt động');
		let chatManager:ChatControler = ChatControler.getInstance()
		
		
		let newRoom:ChatType = await chatManager.createRoom(["5404957532950033","5404957532950033"])
		DiscordClient.sendTextChatToChatLog(newRoom.members[0],newRoom,"Chào bé")
		
	},
};