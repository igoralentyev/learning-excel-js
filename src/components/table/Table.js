/* eslint-disable max-len */
/* eslint-disable indent */
import {BaseComponent} from '../../core/BaseComponent.js';
import {createTable} from './table.template.js';
import {$} from '../../core/Dom.js'
import {TableSelection} from './selection/TableSelection.js';
import {TableHelpers} from './helpers/TableHelpers.js';
import {tableResize} from './resize/TableResize.js';

export class Table extends BaseComponent
{
    static className = 'excel__table';

    constructor($root, options)
    {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.unsubs = []
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
        this.selectCell($firstCell)

        this.$subscribe('formula:onInput', text => {
            this.selection.current.text(text)
        })

        this.$subscribe('formula:onEnter', () => {
            this.selection.current.focus()
        })

        this.$storeSubscribe(state => {
            console.log('table state: ', state);
        })
    }

    selectCell($cell, needClear = false)
    {
        this.selection.select($cell, needClear)
        this.$emit('table:selection', $cell)
        this.$storeDispatch({type: 'TEST'})
    }

    async resizeHandler(e) {
        try {
            const cellData = await tableResize(this.$root, e)
            this.$storeDispatch({type: 'TABLE_RESIZE', data: cellData})
        } catch (error) {
            console.warn('resize error', error.message)
        }
    }

    onMousedown(e)
    {
        // Resize handler
        if (e.target.dataset.resize)
        {
            this.resizeHandler(e)
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
                this.selectCell($target, needClearSelection)
            }
        }
    }

    onKeydown(e)
    {
        // Arrows and some keys controls for table
        const eventsTypes = ['Tab', 'Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']
        if (eventsTypes.includes(e.key) && !e.shiftKey)
        {
            e.preventDefault()
            const id = this.selection.current.getCellId(true)
            const $next = this.$root.find(TableHelpers.nextSelector(e.key, id))
            this.selectCell($next, e.ctrlKey ? false : true)
        }
    }

    onInput(e)
    {
        this.$emit('table:onInput', $(e.target))
    }
}