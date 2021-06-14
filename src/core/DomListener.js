import {capitalize} from './Utils';

export class DomListener 
{
    constructor($root, listeners = [])
    {
        if (!$root)
        {
            throw new Error('No root provided for DomListener');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners()
    {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this.[method])
            {
                // eslint-disable-next-line max-len
                throw new Error(`method ${method} not implemented in component ${this.name || ''}`);
            }
            
            this[method] = this[method].bind(this)
            // Add event listener
            this.$root.on(listener, this[method]);
        })
    }

    removeDOMListeners()
    {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        })
    }
}

function getMethodName(name)
{
    return 'on' + capitalize(name);
}
