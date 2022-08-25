
class queueManager{
    constructor(){
        this.queue = []
    }
    addUserToQueue(userID){
        this.queue.push(userID)
        return this
    }
    rmUserFromQueue(userID){
        var index = this.queue.indexOf(userID);
        if (index > -1) {
            this.queue.splice(index, 1);
        }
        return this
    }
    shuffleUserInQueue(){
        // t không nghĩ chúng ta cần cái function này
    }
    randomUserInQueue(){
        return this.queue[Math.floor(Math.random()*this.queue.length)]
    }
    popUserToChat(){
        let numOfChat = Math.floor((this.queue.length -(this.queue.length % 2))/2)
        
        let list = []
        for(let index = 0; index < numOfChat; index++){
            let chat = []
            let user1 = this.randomUserInQueue()
            this.rmUserFromQueue(user1)
            chat.push(user1)
            let user2 = this.randomUserInQueue()
            this.rmUserFromQueue(user2)
            chat.push(user2)
            console.log(user1+":"+user2)
            list.push(chat)
        }
        return list
    }
    
}


module.exports = queueManager;