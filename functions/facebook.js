require("dotenv").config()
const superagent = require("superagent")
const ENDPOINT = "https://graph.facebook.com/v14.0"

class FacebookController {
    messageEndpoint = ENDPOINT + '/me/messages'

    constructor(accessToken) {
        this.accessToken = accessToken
    }

    async sendMessage(userID, messagePayload) {

        const body_data = {
            recipient: { id: userID },
            message: messagePayload.message
        }

        superagent
            .post(messageEndpoint)
            .query({ access_token: process.env.MESS_API })
            .send(body_data)
            .end(err => {
                if (err) console.log(err)
            })

    }

    async sendTextOnlyMessage(userID, message) {
        await this.sendMessage(userID, new MessageBuilder().addText(message))
    }

    async sendMessageUsingTemplate(templateBuilder, userID) {
        const messageBuilder = new MessageBuilder().addGenericTemplate(templateBuilder)
        await this.sendMessage(userID, messageBuilder)

    }
}

class TemplateBuilder {

    constructor() {
        this.data = {
            buttons: []
        }
    }


    setTitle(title) {
        this.data.title = title
        return this
    }
    setSubtitle(subtitle) {
        this.data.subtitle = subtitle
        return this
    }
    addPostbackButton(title, payload) {
        this.data.buttons.push({ type: "postback", title, payload })
        return this
    }
    addWebviewButton(title, url) {
        this.data.buttons.push({ type: "web_url", title, url })
        return this
    }
}

class MessageBuilder {

    constructor() {
        this.message = {
            attachment: {}
        }
    }
    addText(textValue) {
        this.message.text = textValue
        return this
    }
    addUrlAttachment(type, url) {
        this.message.attachment = {
            type,
            payload: {
                url, is_reusable: false
            }
        }
        return this
    }
    addGenericTemplate(templateBuilder) {
        if (this.message.attachment === {})
            this.message.attachment = { type: "template", payload: { template_type: "generic", elements: [] } }
        this.message.attachment.payload.elements.push(templateBuilder.data)
        return this
    }

    toString() {
        return this.message
    }

}

module.exports = { MessageBuilder, TemplateBuilder, FacebookController }

