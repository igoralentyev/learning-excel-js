import {BaseComponent} from '../../core/BaseComponent.js';
import {$} from '../../core/Dom.js'
export class Formula extends BaseComponent
{
    static className = 'excel__formula';

    constructor($root, options)
    {
        super($root, {
            name: 'formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    init()
    {
        super.init()

        this.formula = this.$root.find('#formulaInput') 

        this.$subscribe('table:selection', (cell) => {
            this.formula.text(cell.text())
        })
        this.$subscribe('table:onInput', (cell) => {
            this.formula.text(cell.text())
        })
    }

    toHTML()
    {
        return `<div class="info">fx</div>
        <div class="input" id='formulaInput' contenteditable spellcheck="false"></div>`;
    }

    onInput(event)
    {
        this.$emit('formula:onInput', $(event.target).text())
    }

    onKeydown(e)
    {
        if (e.key == 'Enter' || e.key == 'Tab')
        {
            e.preventDefault()
            this.$emit('formula:onEnter')
        }
    }
}