require("dotenv").config();
import * as express from "express";
import mongoose, { ConnectOptions } from 'mongoose'
import { QueueManager } from "./functions/queueManager"

import { handlePostbackEvent } from "./handlers/postback/EXISTED_USER_START"
import { handleMessageEvent } from "./handlers/message/handleMessageEvent"

const queueManager = new QueueManager()
const app = new (express as any)()


const db = mongoose.connection
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true } as ConnectOptions).then(() => console.log('DB Connected!'))
db.on('error', (err: any) => {
  console.log('DB connection error:', err.message)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.listen(3001)

//webhook handling

app.get("/webhook", (req: any, res: any) => {

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


app.post("/webhook", (req: any, res: any) => {

  if (req.body.object !== "page") return res.sendStatus(404)
  res.status(200).send("EVENT_RECEIVED")
  req.body.entry.forEach((entries: any) => {
    entries.messaging.forEach((mess: any) => {
      
      if ("read" in mess) handleReadEvent(mess)
      if ("message" in mess) handleMessageEvent(mess)
      if ("postback" in mess) handlePostbackEvent(mess)
      if ("attachments" in mess) handleAttachmentsEvent(mess)
    })
  });

})


async function handleReadEvent(mess: any) { }
async function handleAttachmentsEvent(mess: any) { }