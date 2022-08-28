require("dotenv").config()
const express = require("express")
const superagent = require("superagent")
let mongoose = require('mongoose');
const { FacebookController } = require("./functions/facebook")
const QueueManager = require("./functions/queueManager")

const handlePostbackEvent = require("./handlers/postback/EXISTED_USER_START")

const queueManager = new QueueManager()
const messenger = new FacebookController(process.env.MESS_API)
const app = new express()


const db = mongoose.connection;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3001)

//webhook handling

app.get("/webhook", (req, res) => {

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  console.log(`🟨 Received Verify Request`);

  if (mode && token === process.env.VERIFY_TOKEN) {

    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
})


app.post("/webhook", (req, res) => {
  if (!req.body.object === "page") return res.sendStatus(404);

  res.status(200).send("EVENT_RECEIVED");
  body.entry.forEach(entries => {
    entries.messaging.forEach(mess => {
      console.log(mess)
      if ("read" in mess) handleReadEvent(mess)
      if ("message" in mess) handleMessageEvent(messenger, mess)
      if ("postback" in mess) handlePostbackEvent(messenger, mess)
      if ("attachments" in mess) handleAttachmentsEvent(mess)
    })
  });

})


async function handleReadEvent(mess) { }
async function handleAttachmentsEvent(mess) { }