import {DomListener} from './DomListener.js';

export class BaseComponent extends DomListener
{
    constructor($root, options = {})
    {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emitter
        this.unsubs = []
        this.prepare()
    }

    toHTML() 
    {
        return '';
    }

    // executes before init
    prepare()
    {
        
    }

    // Notifies listeners about event 
    $emit(event, ...args)
    {
        this.emitter.emit(event, ...args)
    }

    $subscribe(event, fn)
    {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    init()
    {
        this.initDOMListeners();
    }
    
    destroy()
    {
        this.removeDOMListeners();
        this.unsubs.forEach(unsub => unsub())
    }
}