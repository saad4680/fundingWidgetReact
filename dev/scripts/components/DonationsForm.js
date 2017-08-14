import React from 'react';

const DonationForm = (props) => {
	return(
	<div>
		<form id="donationForm" action="" onSubmit={props.handleSubmit}>
		<span className="Currency"><input type="number" id={props.inputID} name={props.inputName} onChange={props.recordChange} required/></span>
		<input type="submit" value="Donate Now"/>
		</form>
		<p>Most people donate $ {props.avgDonation}</p>
	</div>	
	)
}

export default DonationForm;