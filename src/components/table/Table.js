import {ExcelComponent} from '../../core/ExcelComponent.js';

export class Table extends ExcelComponent
{
    static className = 'excel__table';

    toHTML()
    {
        return `<div class="row">
        <div class="iterator"></div>
        <div class="row-data">
            <div class="column">A</div>
            <div class="column">B</div>
            <div class="column">C</div>
        </div>
    </div>

    <div class="row">
        <div class="iterator">1</div>
        <div class="row-data">
            <div contenteditable class="cell selected">1</div>
            <div contenteditable class="cell">2</div>
            <div contenteditable class="cell">3</div>
        </div>
    </div>

    <div class="row">
        <div class="iterator">1</div>
        <div class="row-data">
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">3</div>
        </div>
    </div>

    <div class="row">
        <div class="iterator">1</div>
        <div class="row-data">
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">3</div>
        </div>
    </div>`;
    }
}