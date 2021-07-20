import {BaseComponent} from '../../core/BaseComponent.js';

export class Header extends BaseComponent
{
    static className = 'excel__header';

    constructor($root, options)
    {
        super($root, {
            name: 'header',
            ...options
        });
    }
    
    toHTML()
    {
        return `
        <input type="text" class='input' value='new table' name='table-name'>
        <div class='buttons-block'>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`;
    }
}