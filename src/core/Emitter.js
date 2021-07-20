export class EventEmitter
{
    constructor()
    {
        this.listeners = {}
    }

    emit(eventName, ...params)
    {
        if (!Array.isArray(this.listeners[eventName])) {
            return false
        }
        this.listeners[eventName].forEach(listener => {
            listener(...params)
        })
        return true
    }

    subscribe(eventName, inputFunction)
    {
        this.listeners[eventName] = this.listeners[eventName] || []
        this.listeners[eventName].push(inputFunction)
        // Какая то лютая дичь, которая позволит отписаться..
        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== inputFunction)
        }
    }
    
    unsubscribe()
    {

    }
}

// const emitter = new EventEmitter()
// emitter.subscribe('testpes', data => console.log('sub', data))

// emitter.emit('testpes', 'test')