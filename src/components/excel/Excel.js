import {$} from '../../core/Dom.js';
import {EventEmitter} from '../../core/Emitter.js';

export class Excel 
{
    constructor(selector, options) 
    {
        /** @type {HTMLElement} */
        this.$el = $(selector);
        this.components = options.components || [];
        this.emmiter = new EventEmitter()
        this.store = options.store
    }

    getRoot()
    {
        // Create main excel div - root element
        const $root = $.create('div', 'excel');
        
        // Send emmitter to all childs
        const componentOptions = {
            emitter: this.emmiter,
            store: this.store
        }

        // eslint-disable-next-line max-len
        // Create base html structure for transferred components (header, toolbar, formula, table);
        this.components = this.components.map(Component => {
            // create div container for each component
            const $el = $.create('div', Component.className);

            const component = new Component($el, componentOptions);

            // Get base html structure for each component and nesting into root
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });

        return $root;
    }

    render()
    {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init())
    }

    destroy()
    {
        this.components.forEach(component => component.destroy())
    }
}