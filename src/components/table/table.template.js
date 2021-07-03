/* eslint-disable max-len */
const CHAR_CODES = {
    A: 65,
    Z: 90
}

// eslint-disable-next-line max-len
export function createTable(rowsCount = 35, colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1 || 10)
{
    const rows = [];
    
    
    const headColumns = new Array(colsCount)
        .fill('')
        .map(getCharByIndex)
        .map(createCell)
        .join('');
    // table head
    rows.push(createRow(headColumns))

    // table body
    for (let row = 1; row <= rowsCount; row++) 
    {
        const bodyColumns = new Array(colsCount)
            .fill('')
            .map(function(el, index) {
                return createCell(el, index, row)
            })
            .join('');
        rows.push(createRow(bodyColumns, row));        
    }

    return rows.join('');
}

function getCharByIndex(_, index)
{
    return String.fromCharCode(CHAR_CODES.A + index);
}

function createRow(content = '', iterator = '')
{
    return `
        <div data-resizable="true" class="row">
            <div class="iterator">${iterator}${iterator ? '<div data-resize="row" class="row-resizer"></div>' : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCell(el, colIndex, row)
{
    if (el !== '')
    {
        return `
            <div data-resizable="true" data-resize-index="${colIndex}" class="column column-head">${el}<div data-resize="col" class="col-resizer"></div></div>
        `;
    }
    return `
        <div data-resize-index="${colIndex}" data-id="${row}:${colIndex}" contenteditable class="column"></div>
    `;
}