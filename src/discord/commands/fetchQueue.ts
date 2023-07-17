import Discord, { EmbedBuilder } from "discord.js"
import { QueueManager } from "../../functions/queueManager";
import { User } from "../../functions/database";

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('queue')
		.setDescription('Nhóm lệnh liên quan tới hệ thống chờ xem lệnh :v')
        .addSubcommand(subcommand =>
            subcommand
                .setName('fetch')
                .setDescription('Xem danh sách người dùng trong hàng chờ')),
	async execute(interaction:any) {
		const queue:Array<string> = QueueManager.getInstance().queue
        let outstr:string = ""
        const count:number = 1
        for await (const user of queue){
            const userInfo:any = await User.findOne({user})
            
            outstr = outstr+`${count}. **${user}**-`
        }
        console.log(queue)
        const embed:EmbedBuilder = new EmbedBuilder()
        .setColor(0x0099FF)
        .addFields({name:`Hiện trong hàng chờ có: ${queue.length} người dùng`,value:queue.length == 0 ? "Danh sách trống": queue.join("\n")})

        interaction.reply({embeds:[embed]})
	},
};