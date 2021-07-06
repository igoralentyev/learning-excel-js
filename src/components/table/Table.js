/* eslint-disable max-len */
/* eslint-disable indent */
import {BaseComponent} from '../../core/BaseComponent.js';
import {createTable} from './table.template.js';
import {$} from '../../core/Dom.js'
import {TableSelection} from './selection/TableSelection.js';
import {TableHelpers} from './helpers/TableHelpers.js';

export class Table extends BaseComponent
{
    static className = 'excel__table';

    constructor($root)
    {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']  
        })
    }

    toHTML()
    {
        return createTable();
    }

    prepare()
    {
        this.selection = new TableSelection;
    }

    init() 
    {
        super.init();
        const $firstCell = this.$root.find('[data-id="1:0"]')
        this.selection.select($firstCell)
    }

    onMousedown(e)
    {
        // Resize handler
        if (e.target.dataset.resize)
        {
            const resizerType = e.target.dataset.resize;
            const $resizer = $(e.target);
            const $parent = $resizer.parent('[data-resizable="true"]');
            const coords = $parent.getCoordinates();
            const resizeIndex = $parent.data.resizeIndex;
            const rowCollection = this.$root.$el.querySelectorAll(`[data-resize-index="${resizeIndex}"]`);
            let colWidth
            let delta;
            
            $resizer.$el.style.opacity = 1;

            document.onmousemove = (event) => {
                if (resizerType == 'col')
                {
                    const delta = Math.floor(event.clientX - coords.right);
                    colWidth = (coords.width + delta);

                    $resizer.$el.style.zIndex = '1000';
                    $resizer.$el.style.right = -delta + 'px';
                    $resizer.$el.style.bottom = '-1000px';
                }
                else if (resizerType == 'row')
                {
                    delta = Math.floor(event.clientY - coords.bottom);
                    
                    $resizer.$el.style.zIndex = '1000';
                    $resizer.$el.style.bottom = -delta + 'px';
                    $resizer.$el.style.width = 2000 + 'px';
                    $resizer.$el.style.left = 0 + 'px';
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;

                if (resizerType == 'col')
                {
                    $parent.$el.style.width = colWidth + 'px';
                    rowCollection.forEach(column => column.style.width = colWidth + 'px')

                    $resizer.$el.style.opacity = null;
                    $resizer.$el.style.right = null;
                }
                else if (resizerType == 'row')
                {
                    $parent.$el.style.height = (coords.height + delta) + 'px';
                    
                    $resizer.$el.style.bottom = null;
                    $resizer.$el.style.width = null;
                    $resizer.$el.style.left = null;
                }
            }
        }
        // Select cell handler
        if (e.target.dataset.tableType == 'cell')
        {
            const $target = $(e.target)
            if (e.shiftKey == true)
            {
                const currentPosition = this.selection.current.getCellId(true)
                const targetPosition = $target.getCellId(true)

                const $cells = TableHelpers.getCellMatrix(currentPosition, targetPosition)
                    .map((id) => this.$root.find(`[data-id="${id}"]`))
                
                this.selection.selectGroup($cells)
            }
            else
            {
                const needClearSelection = e.ctrlKey ? false : true
                this.selection.select($target, needClearSelection);
            }
        }
    }
}