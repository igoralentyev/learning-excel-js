import {BaseComponent} from '../../core/BaseComponent.js';

export class Toolbar extends BaseComponent
{
    static className = 'excel__toolbar';

    constructor($root, options)
    {
        super($root, {
            name: 'toolbar',
            listeners: ['click'],
            ...options
        })
    }

    toHTML()
    {
        return `
                <div class="button">
                    <i class="material-icons">format_bold</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_italic</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_underlined</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_align_left</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_align_center</i>
                </div>
                <div class="button">
                    <i class="material-icons">format_align_right</i>
                </div>`;
    }

    onClick(event)
    {
        console.log(event.target);
    }
}