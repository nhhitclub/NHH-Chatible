import { Schema, model } from "mongoose"
import * as redis from "redis"
import NodeCache from "node-cache"


// const promiseRedisClient = {
//     SADD: promisify(redisClient.SADD).bind(redisClient),
//     SIMEMBER: promisify(redisClient.SISMEMBER).bind(redisClient),
//     SREM: promisify(redisClient.SREM).bind(redisClient),
//     SET : promisify(redisClient.SET).bind(redisClient),
//     GET: promisify(redisClient.get).bind(redisClient),
//     HSET: promisify(redisClient.HSET).bind(redisClient),
//     HGET: promisify(redisClient.HGET).bind(redisClient),
//     DEL: promisify(redisClient.DEL).bind(redisClient),
//     EXISTS: promisify(redisClient.EXISTS).bind(redisClient)
//   }

//Cache here

class cacheInterface {
    private cache:unknown
    constructor(type:string,config?:any) {

        if(type ==  "redis"){
            this.cache = redis.createClient(config)
        }
        else if(type == "internal"){
            this.cache = new NodeCache({stdTTL:2*60})
        }
        else{
            console.error("Invaild type of cache type");
        }
    }

    // get(data:string):any{

    // }

    // set(data:string,val:any,ttl:number):boolean{
    // }

    // delete(data:string):boolean{

    // }
    // editTTL(data:string,newTTL:number):boolean{

    // }

}


const userSchema: Schema = new Schema({
    userID: String,
    isBlocked: Boolean,
    blockReason: String,
    blockExpiry: String,
    currentChatID: String
})

const chatSchema: Schema = new Schema({
    chatID: String,
    members: [String],
    chatMess: [{
        sender: String,
        text: String,
        attachmentURL: String,
        emoji_ID:String
    }]
})



const User = model('User', userSchema)
const Chat = model('Chat', chatSchema)

export { User, Chat }


