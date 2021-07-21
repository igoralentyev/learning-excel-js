import {Excel} from './components/excel/Excel.js';
import {Formula} from './components/formula/Formula.js';
import {Header} from './components/header/Header.js';
import {Table} from './components/table/Table.js';
import {Toolbar} from './components/toolbar/Toolbar.js';
import {createStore} from './core/createStore.js';
import {rootReducer} from './redux/rootReducer.js';
import './scss/style.scss';

const initialState = {
    colState: {}
}
const store = createStore(rootReducer, initialState)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});
excel.render();