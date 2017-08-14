import React from 'react';

const Progress = (props) => {
	return(
	<div className="progressBar">
		<progress value={props.Completion} max="100"></progress>
		<div className="bubbleContainer">
			<div className="bubble">
				<p>  $ {props.Cumulative} pledged of $ {props.Target} goal</p>
			</div>
		</div>	
	</div>
	)	
}

export default Progress;