/* eslint-disable indent */
import {BaseComponent} from '../../core/BaseComponent.js';
import {createTable} from './table.template.js';

export class Table extends BaseComponent
{
    static className = 'excel__table';

    constructor($root)
    {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        })
    }

    toHTML()
    {
        return createTable();
    }
}