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
        const $root = document.createElement('div');
        $root.classList = 'excel';
        this.components.forEach(Component => {
            const component = new Component();
           
            $root.insertAdjacentHTML('beforeend', component.toHTML())
        });

        return $root;
    }

    render()
    {
        // this.$el.insertAdjacentHTML('afterbegin', '22222');
        this.$el.append(this.getRoot());
    }
}