export class TableSelection
{
    static selectedClassName = 'selected' 

    constructor()
    {
        this.group = []
        this.current = null
    }

    select($el, isNeedClear = false)
    {
        if (isNeedClear) 
        {
            this.clearSelection()
        }

        this.group.push($el)
        $el.focus().addClass('selected')
        this.current = $el
    }

    clearSelection()
    {
        this.group.forEach($el => $el.removeClass(TableSelection.selectedClassName))
        this.group = []
    }

    selectGroup(cells = [])
    {
        this.clearSelection()
        this.group = cells
        this.group.forEach($el => $el.addClass(TableSelection.selectedClassName))
    }
}