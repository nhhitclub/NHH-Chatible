
export class QueueManager{

    private queue: Array<string> = ['lmaookjlafdsf'];
    private static instance: QueueManager;

    private constructor(){}

    public static getInstance(): QueueManager{
        if(!QueueManager.instance) QueueManager.instance = new QueueManager()

        return QueueManager.instance
    }

    addUserToQueue(userID: string): QueueManager{
        if(this.queue.indexOf(userID) !== -1) return
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
        if(this.queue.length === 0) return

        for(let i: number = 0; i < 100; i++){
            this.reverse(this.queue, 
                Math.floor(Math.random()*this.queue.length), 
                Math.floor(Math.random()*this.queue.length))
        }
    }
    private reverse(array:Array<any>, a: number, b: number) {
        const temp: any = array[b];
        array[b] = array[a];
        array[a] = temp;

        return array
    }
    randomUserInQueue(){
        return this.queue[Math.floor(Math.random()*this.queue.length)]
    }
    popUserToChat(){
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

        this.shuffleUserInQueue()
        return list;
    }
    
}