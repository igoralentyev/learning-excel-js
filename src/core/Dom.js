class Dom
{
    constructor(selector)
    {
        /** @type {HTMLElement} */
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html)
    {
        if (typeof html === 'string')
        {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    parent(selector)
    {
        return $(this.$el.closest(selector));
    }

    getCoordinates()
    {
        return this.$el.getBoundingClientRect();
    }

    css(styles = {})
    {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key];
        })
    }

    clear()
    {
        this.html('');
        return this;
    }

    get data()
    {
        return this.$el.dataset;
    }

    append(node)
    {
        if (node instanceof Dom)
        {
            node = node.$el;
        }
        if (Element.prototype.append)
        {
            this.$el.append(node)
        }
        else
        {
            this.$el.appendChild(node);
        }
        return this;
    }

    on(eventType, callback)
    {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback)
    {
        this.$el.removeEventListener(eventType, callback);
    }
}
export function $(selector)
{
    /** @type {HTMLElement} */
    return new Dom(selector);
}

$.create = (tagName, className = '') => {
    /** @type {HTMLElement} */
    const el = document.createElement(tagName);
    if (className)
    {
        el.classList.add(className);
    }
    return $(el);
}