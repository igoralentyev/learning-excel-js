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
    
    const bodyColumns = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');
    // table head
    rows.push(createRow(headColumns))
    // table body
    for (let i = 1; i <= rowsCount; i++) 
    {
        rows.push(createRow(bodyColumns, i));        
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
        <div class="row">
            <div class="iterator">${iterator}${iterator ? '<div class="row-resizer"></div>' : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCell(el)
{
    if (el !== '')
    {
        return `
            <div class="column column-head">${el}<div class="col-resizer"></div></div>
        `;
    }
    return `
        <div contenteditable class="column"></div>
    `;
}