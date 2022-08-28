
export class QueueManager{

    private queue: any = [];

    addUserToQueue(userID: string): QueueManager{
        this.queue.push(userID)
        return this
    }
    rmUserFromQueue(userID: string): QueueManager{
        var index = this.queue.indexOf(userID)
        if (index > -1) {
            this.queue.splice(index, 1)
        }
        return this
    }
    shuffleUserInQueue(){
        // t không nghĩ chúng ta cần cái function này
    }
    randomUserInQueue(){
        return this.queue[Math.floor(Math.random()*this.queue.length)]
    }
    popUserToChat(): Array<any>{
        const numOfChat = Math.floor((this.queue.length -(this.queue.length % 2))/2)
        
        const list: Array<any> = []
        for(let index = 0; index < numOfChat; index++){
            const chat = []

            const user1 = this.randomUserInQueue()
            this.rmUserFromQueue(user1)
            chat.push(user1)

            const user2 = this.randomUserInQueue()
            this.rmUserFromQueue(user2)
            chat.push(user2)

            console.log(user1+":"+user2)
            list.push(chat)
        }
        return list
    }
    
}