import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const store = createStore(counter);

const incrementValue = () => {
	console.log('inc');
	store.dispatch({ type: 'INCREMENT' });
}

const decrementValue = () => {
	store.dispatch({ type: 'DECREMENT' });
}

const render = () => {
	ReactDOM.render(<Counter value={store.getState()} increment={incrementValue} decrement={decrementValue} />, document.getElementById('root'))
};

render();

store.subscribe(render);
