import {ExcelComponent} from '../../core/ExcelComponent.js';

export class Formula extends ExcelComponent
{
    static className = 'excel__formula';

    toHTML()
    {
        return '<h1>Formula</h1>';
    }
}