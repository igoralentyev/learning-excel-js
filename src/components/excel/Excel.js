import {$} from '../../core/Dom';

export class Excel 
{
    constructor(selector, options) 
    {
        /** @type {HTMLElement} */
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot()
    {
        // Create main excel div - root element
        const $root = $.create('div', 'excel');
        
        // eslint-disable-next-line max-len
        // Create base html structure for transferred components (header, toolbar, formula, table);
        this.components.forEach(Component => {
            // create div container for each component
            const $el = $.create('div', Component.className);

            const component = new Component($el);

            // Get base html structure for each component and nesting into root
            $el.html(component.toHTML());
            $root.append($el);
        });

        return $root;
    }

    render()
    {
        this.$el.append(this.getRoot());
    }
}