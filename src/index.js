import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers'
let initialState;

if (localStorage.getItem('order')!=null) {

    initialState = {
        order: localStorage.getItem('order'),
        orderBy: localStorage.getItem('orderBy'),
        selected: [],
        filter: localStorage.getItem('filter')
    }
} 
    else {
        initialState = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            filter: ''
        }
    }

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

document.getElementById('searchInput').value=initialState.filter;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
