import React from 'react';

const Counter = (props) => (
	<div>
		<h1>{props.value}</h1>
		<button onClick={props.increment}>+</button>
		<button onClick={props.decrement}>-</button>
	</div>
);

export default Counter;