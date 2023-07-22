import CryptoService from "../../functions/crypto";
import { Request, Response } from "express";
import { DiscordClient } from "../../functions/discord";
import { EmbedBuilder, TextChannel } from "discord.js";

export let submittedToken: Array<{token: string, date: Date}> = []

export default async function(req: Request, res: Response){
  const q = req.query

  const stdate = new Date(CryptoService.extractDate(q.tk.toString()));

  submittedToken = submittedToken.filter((i: any) => {
    i.date.setTime(i.date.getTime() + parseInt(process.env.TOKEN_DURATION))
    
    return (new Date()).getTime() <= i.date.getTime();
  })
  submittedToken.push({token: q.tk.toString(), date: stdate })
  
  const channel = await DiscordClient.getChannelByID('1041289492792889394') as TextChannel;
  const em:EmbedBuilder = new EmbedBuilder()
    .setColor(0x0099FF)
    .addFields({
        name: 'CHAT REPORTED: <#' + q.tid + '>',
        value: 'Phân loại: ' + req.body.issue_content + '\nChi tiết : ' + req.body.description + 
            '\nEmail: ' + req.body.email
    });

  channel.send({embeds:[
    em
  ]})

  return res.redirect('/report-done')
}