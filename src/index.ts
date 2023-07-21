require("dotenv").config();
const dev:boolean = process.env.NODE_ENV !== 'production'
import express from "express";
import mongoose, { ConnectOptions } from 'mongoose'
import next from "next"
import { DiscordClient } from "./functions/discord"
import bodyParser from "body-parser";


import { handlePostbackEvent } from "./handlers/event/handlePostbackEvent"
import { handleMessageEvent } from "./handlers/event/handleMessageEvent"
import { handleChatRandom } from "./cronJob/chatRandom"
import { NextServer } from "next/dist/server/next"
import CryptoService from "./functions/crypto";
import { Chat } from "./functions/database";
import { EmbedBuilder, TextChannel } from "discord.js";



const app:express.Express = express()
const db = mongoose.connection
const TOKEN_DURATION = 60 * 60 * 1000;
DiscordClient.initialization(process.env.DISCORD_TOKEN) 

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true } as ConnectOptions)
  .then(() => console.log('Connected'))


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NEXT_DISABLE != "true"){
  const webApp:NextServer = next({dev})
  webApp.prepare()
  const webAppRequestHandle = webApp.getRequestHandler()
  app.post('/report', async (req, res) => {
    const current = new Date();
    const q = req.query
    const chatbox = await Chat.findOne({ chatID: q.cid })
    const validation = CryptoService.validate(
      q.tk.toString(), 
      q.uid.toString(), 
      q.cid.toString(), 
      chatbox.threadID, 
      chatbox?._doc._id.toString())

    const expDate = new Date(CryptoService.extractDate(q.tk.toString()));
    expDate.setTime(expDate.getTime() + TOKEN_DURATION)
    const gap = expDate.getTime() - current.getTime();
    const expired = gap < 0;

    
    if(!validation || expired){
      res.send('NOOOO').status(403);
      return;
    }
    
    const channel = await DiscordClient.getChannelByID('1041289492792889394') as TextChannel;
    const em:EmbedBuilder = new EmbedBuilder()
      .setColor(0x0099FF)
      .addFields({
          name: 'CHAT REPORTED: <#' + chatbox.threadID + '>',
          value: 'Phân loại: ' + req.body.issue_content + '\nChi tiết : ' + req.body.description
      });

    channel.send({embeds:[
      em
    ]})

    // TODO: Make a redirect site for both 403 and 200 status code.

    return res.send("OK")
  })

  app.get('*', (req, res) => {
    return webAppRequestHandle(req, res)
  })

}


db.on('error', (err: any) => {
  console.log('DB connection error:', err.message)
})


app.get("/webhook", (req: express.Request, res: express.Response) => {

  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  console.log(`🟨 Received Verify Request`)

  if (mode && token === process.env.VERIFY_TOKEN) {

    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})


app.post("/webhook", (req: express.Request, res: express.Response) => {


  if (req.body.object !== "page") return res.sendStatus(404)
  res.status(200).send("EVENT_RECEIVED")
  // console.dir(req.body,{depth :null})
  req.body.entry.forEach((entries: any) => {
    entries.messaging.forEach((mess: any) => {
      
      if ("read" in mess) handleReadEvent(mess)
      if ("message" in mess) handleMessageEvent(mess)
      if ("postback" in mess) handlePostbackEvent(mess)
      // if ("attachments" in mess) handleAttachmentsEvent(mess)
    })
  });

})


app.get("/ping", (req: express.Request, res: express.Response) => {
  res.send("OK")
})


app.listen(process.env.WEBPORT)


async function handleReadEvent(mess: any) { }
async function handleAttachmentsEvent(mess: any) { }


// //save old querry
// const exec = mongoose.Query.prototype.exec
// //overwrite the exec fucntion
// mongoose.Query.prototype.exec = async function () {
//   const key = JSON.stringify({
//       ...this.getQuery(),
//       collection: this.mongooseCollection.name,
//       op: this.op,
//       options: this.options
//     })

//     const cacheValue = await promiseRedisClient.get(key)
//     if(cacheValue){
      
//     } return JSON.parse(cacheValue)


// }


setInterval(handleChatRandom, 15000)