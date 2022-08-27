require("dotenv").config()
const express = require("express")
const superagent = require("superagent")
let mongoose = require('mongoose');
const {FacebookControler,templateBuilder,messageBuilder} = require("./functions/facebook")
const {User} = require("./functions/mongooes")





const messenger = new FacebookControler(process.env.MESS_API)
const app = new express()

module.exports.queueManager 

const db = mongoose.connection;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', err => {
  console.log('DB connection error:', err.message);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3001)

//weeebhoooook handling

app.get("/webhook", async (req, res) => {

  const VERIFY_TOKEN = 'connaingoicanhcontronconnaithaytheliemtaicontron';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  console.log(`🟨 Received Verify Request`);

  if (mode && token === VERIFY_TOKEN) {

    await res.status(200).send(challenge);
    return
  }

  await res.sendStatus(403);

})


app.post("/webhook", (req, res) => {
  const body = req.body;

  if (!body.object === "page") return res.sendStatus(404);

  console.log(`\u{1F7EA} Received webhook:`);
  // console.dir(body, { depth: null });
  res.status(200).send("EVENT_RECEIVED");
  body.entry.forEach(entries => {
    entries.messaging.forEach(mess => {
      console.log(mess)
      if ("read" in mess) handleReadEvent(mess)
      if ("message" in mess) handleMessageEvent(mess)
      if ("postback" in mess) handlePostbackEvent(mess)
      if ("attachments" in mess) handleAttachmentsEvent(mess)
    })
  });


})

async function handlePostbackEvent(mess) {
  require("./handlers/postback/NEW_USER_START").run(mess, messenger)

}

async function handleReadEvent(mess) {

}

async function handleMessageEvent(mess) {
  const userID = mess.sender.id
  const userInDB = await User.find({ userID })

  if (userInDB.length === 0) {
    return NewUserRequestHandle(messenger, userID);
  }

  if (userInDB[0].currentChat === "") {
    return ContinueChattingHandle(messenger, userID);
  }


}

async function sendMessage(userID, payloads) {
}