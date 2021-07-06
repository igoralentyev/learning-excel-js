export class TableHelpers 
{
    // TODO: баг когда строки в обратном порядке. С столбцами всё ок
    static getRange(start, end)
    {
        if (start > end)
        {
            // Хак для переворота через деструктуризацию
            [end, start] = [start, end]
        }
        return new Array(end - start +1)
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
}