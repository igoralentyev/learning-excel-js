export class TableSelection
{
    constructor()
    {
        this.group = []
    }

    select($el)
    {
        this.group.push($el)
        console.log(this);
        $el.addClass('selected')
    }

    selectGroup()
    {
        
    }
}