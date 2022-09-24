require("dotenv").config();
const dev:boolean = process.env.NODE_ENV !== 'production'
import express, { response } from "express";
import mongoose, { ConnectOptions } from 'mongoose'
import next, { NextApiHandler } from "next"
import { parse } from "url"

import { handlePostbackEvent } from "./handlers/event/handlePostbackEvent"
import { handleMessageEvent } from "./handlers/event/handleMessageEvent"
import { handleChatRandom } from "./cronJob/chatRandom"
import { NextServer, RequestHandler } from "next/dist/server/next";


const webApp:NextServer = next({dev})
const app:express.Express = express()
const db = mongoose.connection


webApp.prepare()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const webAppRequestHanle = webApp.getRequestHandler()
// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true } as ConnectOptions).then(() => console.log('DB Connected!'))
// db.on('error', (err: any) => {
//   console.log('DB connection error:', err.message)
// })

console.log(process.env)


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

app.all('*', (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl
  return webAppRequestHanle(req, res,parsedUrl)
})



app.listen(process.env.WEBPORT)



async function handleReadEvent(mess: any) { }
async function handleAttachmentsEvent(mess: any) { }



setInterval(handleChatRandom,15000)