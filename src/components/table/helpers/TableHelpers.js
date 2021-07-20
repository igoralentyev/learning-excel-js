/* eslint-disable indent */
export class TableHelpers 
{
    static getRange(start, end)
    {
        // Без приведения типов условие криво работало
        if (Number(start) > Number(end))
        {
            // Хак для переворота через деструктуризацию
            [start, end] = [end, start]
            // то же самое без выебонов
            // let temp = start
            // start = end
            // end = temp
        }
        return new Array(Number(end) - Number(start) +1)
            .fill('')
            .map((_, index) => +start + index)
    }

    static getCellMatrix(currentPosition, targetPosition)
    {
        const rowRange = this.getRange(currentPosition.row, targetPosition.row)
        const cellRange = this.getRange(currentPosition.col, targetPosition.col)

        const ids = cellRange.reduce((acc, col) => {
            rowRange.forEach((row, _) => {
                acc.push(`${row}:${col}`)
            })
            return acc
        }, [])
        return ids
    }

    static nextSelector(key, {row, col})
    {
        switch (key)
        {
            case 'Tab':
                col++
                break
            case 'Enter':
                row++
                break
            case 'ArrowDown':
                row++
                break
            case 'ArrowUp':
                if (row > 1)
                {
                    row--
                }
                break
            case 'ArrowLeft':
                if (col > 0)
                {
                    col--
                }
                break
            case 'ArrowRight':
                col++
                break
        }        
        return `[data-id="${row}:${col}"]`
    }
}