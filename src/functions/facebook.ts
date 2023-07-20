require("dotenv").config();
const superagent: any = require("superagent");
const ENDPOINT: string = "https://graph.facebook.com";

class FacebookController {
    private messageEndpoint: string = ENDPOINT + "/v14.0/me/messages";
    private static instance: FacebookController;

    private constructor() {
    }

    public static getInstance(): FacebookController {
        if (FacebookController.instance == null) {
            FacebookController.instance = new FacebookController()
        }

        return FacebookController.instance;
    }

    public async getUserByID(userID: string) {
        let request = await superagent
                            .get(ENDPOINT+"/"+userID)
                            .query({
                                fields:"name,profile_pic",
                                access_token: process.env.MESS_API
                        })
        // console.log(request.body)
        return JSON.parse(request.text)
    }

    public async sendMessage(userID: string, messagePayload: MessageBuilder) {
        const body_data: any = {
            recipient: { id: userID },
            message: messagePayload.getMessage(),
        };
        superagent
            .post(this.messageEndpoint)
            .query({ access_token: process.env.MESS_API })
            .send(body_data)
            .end((err: any) => {
                if (err) console.log('Error');
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

    public async sendLikeIcon(userID: string) {
        await this.sendTextOnlyMessage(userID, "👍");
    }

    public async sendFeedback(userID: string) {
        const feedback = new CustomerFeedbackBuilder()
            .addTitle('Góp ý cho NHH Chatible :D')
            .addSubtitle('Chúng mình rất vui khi nhận góp ý của các bạn').addButtonTitle('Đánh giá')

        const messageBuilder = new MessageBuilder().addFeedbackTemplate(feedback)

        await this.sendMessage(userID, messageBuilder)
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
        // attachment: {},
    };

    addText(textValue: string): MessageBuilder {
        this.message.text = textValue;
        return this;
    }
    private preRequireAttachmentMessage() {
        if (!this.message.attachment) this.message.attachment = {}
    }
    addUrlAttachment(type: string, url: string): MessageBuilder {
        this.preRequireAttachmentMessage()
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
        this.preRequireAttachmentMessage()
        if (this.message.attachment && Object.keys(this.message.attachment).length === 0)
            this.message.attachment = {
                type: "template",
                payload: { template_type: "generic", elements: [] },
            };
        this.message.attachment.payload.elements.push(templateBuilder.data);
        return this;
    }
    addFeedbackTemplate(customerFeedbackBuilder: CustomerFeedbackBuilder): MessageBuilder {
        this.preRequireAttachmentMessage()
        if (this.message.attachment && Object.keys(this.message.attachment).length === 0)
            this.message.attachment = {
                type: "template",
                payload: customerFeedbackBuilder.payload,
            };

        return this;
    }

    toString(): string {
        return this.message;
    }

    getMessage() {
        return this.message;
    }
}

class CustomerFeedbackBuilder {
    public payload: any = {
        template_type: "customer_feedback",
        feedback_screens: [{
            questions: [{
                id: "phucdepzai",
                type: "csat",
                score_label: "dis_sat",
                score_option: "five_stars",
                follow_up:
                {
                    type: "free_form",
                    placeholder: "Chi tiết bài đánh giá của bạn..."
                }
            }]
        }],
        business_privacy: 
        {
            url: process.env.PRIVACY_POLICY
        },
        expires_in_days : 3
    };

    getMessage() {
        return this.payload;
    }

    addTitle(title: string) {
        this.payload.title = title;

        return this
    }

    addSubtitle(subtitle: string) {
        this.payload.subtitle = subtitle;

        return this
    }

    addButtonTitle(title: string) {
        this.payload.button_title = title;

        return this
    }

    setQuestionTitle(title: string) {
        this.payload.question.title = title;

        return this
    }




}

export { MessageBuilder, TemplateBuilder, FacebookController };
