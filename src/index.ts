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
import onSubmitHandle from "./handlers/report/onSubmitHandle";
import tokenValidateMiddleware from "./handlers/report/tokenValidateMiddleware";



const app:express.Express = express()
const db = mongoose.connection

DiscordClient.initialization(process.env.DISCORD_TOKEN) 

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true } as ConnectOptions)
  .then(() => console.log('Connected'))


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

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

if(process.env.NEXT_DISABLE != "true"){
  const webApp:NextServer = next({dev})
  webApp.prepare()
  const webAppRequestHandle = webApp.getRequestHandler()

  //! PLEASE DO NOT ALTER THE POSITION OF EACH LINE, AS IT WAS DESIGNED TO PREVENT TIMING ATTACK
  app.post('/report', tokenValidateMiddleware, onSubmitHandle)
  app.get('/report', tokenValidateMiddleware,(req, res) => {
    return webAppRequestHandle(req, res)
  })

  app.get('*', (req, res) => {
    return webAppRequestHandle(req, res)
  })

}



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