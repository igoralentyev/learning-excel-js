import {$} from '../../../core/Dom.js';

export function tableResize($root, e) {
    return new Promise(resolve => {
        const resizerType = e.target.dataset.resize;
        const $resizer = $(e.target);
        const $parent = $resizer.parent('[data-resizable="true"]');
        const coords = $parent.getCoordinates();
        const resizeIndex = $parent.data.resizeIndex;
        const rowCollection = $root.$el.querySelectorAll(`[data-resize-index="${resizeIndex}"]`);
        let colWidth
        let colHeight
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
                colHeight = coords.height + delta

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
                $parent.$el.style.height = colHeight + 'px';
                
                $resizer.$el.style.bottom = null;
                $resizer.$el.style.width = null;
                $resizer.$el.style.left = null;
            }

            const value = resizerType === 'col' ? colWidth : colHeight
            resolve({
                value,
                id: resizerType === 'col' ? $parent.data.resizeIndex : null
            })
        }    
    })
}