require("dotenv").config();
const superagent: any = require("superagent");
const ENDPOINT: string = "https://graph.facebook.com/v14.0";

class FacebookController {
    private messageEndpoint: string = ENDPOINT + "/me/messages";
    private static instance: FacebookController;

    private constructor() {
    }

    public static getInstance(): FacebookController {
        if(FacebookController.instance == null) {
           FacebookController.instance = new FacebookController()
        }

        return FacebookController.instance;
    }

    public async sendMessage(userID: string, messagePayload: MessageBuilder) {
        const body_data = {
            recipient: { id: userID },
            message: messagePayload.message,
        };

        superagent
            .post(this.messageEndpoint)
            .query({ access_token: process.env.MESS_API })
            .send(body_data)
            .end((err: any) => {
                if (err) console.log(err);
            });
    }

    public async sendTextOnlyMessage(userID: string, message: string) {
        await this.sendMessage(userID, new MessageBuilder().addText(message));
    }

    public async sendMessageUsingTemplate(userID: string, templateBuilder: TemplateBuilder) {
        const messageBuilder = new MessageBuilder().addGenericTemplate(
            templateBuilder
        );
        await this.sendMessage(userID, messageBuilder);
    }
}

class TemplateBuilder {
    public data: any = {
        buttons: [],
    };

    setTitle(title: string) {
        this.data.title = title;
        return this;
    }
    setSubtitle(subtitle: string) {
        this.data.subtitle = subtitle;
        return this;
    }
    addPostbackButton(title: string, payload: string) {
        this.data.buttons.push({ type: "postback", title, payload });
        return this;
    }
    addWebviewButton(title: string, url: string) {
        this.data.buttons.push({ type: "web_url", title, url });
        return this;
    }
}

class MessageBuilder {
    public message: any = {
        attachment: {},
    };

    addText(textValue: string): MessageBuilder {
        this.message.text = textValue;
        return this;
    }
    addUrlAttachment(type: string, url: string): MessageBuilder {
        this.message.attachment = {
            type,
            payload: {
                url,
                is_reusable: false,
            },
        };
        return this;
    }
    addGenericTemplate(templateBuilder: TemplateBuilder): MessageBuilder {
        if (this.message.attachment && Object.keys(this.message.attachment).length === 0)
            this.message.attachment = {
                type: "template",
                payload: { template_type: "generic", elements: [] },
            };
        this.message.attachment.payload.elements.push(templateBuilder.data);
        return this;
    }

    toString(): string {
        return this.message;
    }
}

export { MessageBuilder, TemplateBuilder, FacebookController };
