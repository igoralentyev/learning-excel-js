import {ExcelComponent} from '../../core/ExcelComponent.js';

export class Header extends ExcelComponent
{
    static className = 'excel__header';
    
    toHTML()
    {
        return '<h1>Header</h1>';
    }
}