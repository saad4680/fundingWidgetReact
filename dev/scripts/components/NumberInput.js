import React from 'react';

class NumberInput extends React.Component{
	render(){
		return(
		<span>
			<label htmlFor={this.props.inputID}></label>
			<input type="number" id={this.props.inputID}  name={this.props.inputName} onChange={this.props.recordChange} required/>
		</span>
		)


	}
}

export default NumberInput;