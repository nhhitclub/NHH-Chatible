require("dotenv").config()
const superagent = require("superagent")

class FacebookControler{
    constructor(accessToken){
        this.accessToken = accessToken
        this.endPoint = "https://graph.facebook.com/v14.0"
    }
    
    async sendMessage(userID,messagePayload){
        let body_data = {
            recipient:{ id:userID},
            message:
                messagePayload
            }
          console.log(body_data)
        superagent
        .post(this.endPoint+'/me/messages')
        .query({access_token:process.env.MESS_API})
        .send(body_data)
        .end((err,data)=>{
            if(err) console.log(err)
        })

    }
}

module.exports.FacebookControler = FacebookControler

class templateBuilder{
    constructor(){
        this.data = {}
    }
    /**
     * Function to set the Title of Template
     * 
     * @param {String} title 
     * @returns this <templateBuilder>
     */
    setTitle(title){
        this.data.title = title
        return this
    }
    setSubtitle(subtitle){
        this.data.subtitle = subtitle
        return this
    }
    addPostbackButton(title,payload){
        if(!this.data.buttons) this.data.buttons = []
        this.data.buttons.push({type:"postback", title,payload})
        return this
    }
    addWebviewButton(title,url){
        if(!this.data.buttons) this.data.buttons = []
        this.data.buttons.push({type:"web_url", title,url})
        return this
    }
}

module.exports.templateBuilder = templateBuilder

class messageBuilder{
    constructor(){
        this.message = {

        }
    }
    addText(textValue){
        this.message.text= textValue
        return this
    }
    addUrlAttachment(type,url){
        this.message.attachment= {
            type,
            payload:{
                url,is_reusable:false
            }
        }
        return this
    }
    addGenericTemplate(templateBuilder){
        if(!this.message.attachment || this.message.attachment ==={}) this.message.attachment= {type:"template",payload:{template_type:"generic",elements:[]}}
        this.message.attachment.payload.elements.push(templateBuilder)
        return this
    }
    
}

module.exports.messageBuilder = messageBuilder

