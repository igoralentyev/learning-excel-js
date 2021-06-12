export class Excel 
{
    constructor(selector, options) 
    {
        /** @type {HTMLElement} */
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot()
    {
        // Create main excel div - root element
        const $root = document.createElement('div');
        $root.classList.add('excel');
        
        // eslint-disable-next-line max-len
        // Create base html structure for transferred components (header, toolbar, formula, table);
        this.components.forEach(Component => {
            // create div container for each component
            const $el = document.createElement('div');
            $el.classList.add(Component.className);
            
            const component = new Component($el);

            // Get base html structure for each component and nesting into root
            $el.innerHTML = component.toHTML();
            $root.append($el);
        });

        return $root;
    }

    render()
    {
        this.$el.append(this.getRoot());
    }
}