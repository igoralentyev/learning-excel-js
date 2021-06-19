import {BaseComponent} from '../../core/BaseComponent.js';

export class Formula extends BaseComponent
{
    static className = 'excel__formula';

    constructor($root)
    {
        super($root, {
            name: 'formula',
            listeners: ['input', 'click']
        });
    }

    toHTML()
    {
        return `<div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>`;
    }

    onInput(event)
    {
        console.log('formula oninput', event.target.textContent);
    }

    onClick(event)
    {
        console.log('not realized ' + this.name);
    }
}