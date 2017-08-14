import React from 'react';
import CountDown from 'react-number-count-down';

const Counter = (props) => {
	return(
	<div className="counter">
		<span>Only </span>
		<CountDown from={parseInt(props.dayTarget)} to={0} type={'-'} addon={'days left to fund this project'} interval={5} onComplete={props.handleComplete}/>	
	</div>
	)

}

export default Counter;