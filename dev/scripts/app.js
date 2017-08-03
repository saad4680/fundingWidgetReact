import React from 'react';
import ReactDOM from 'react-dom';
import CountDown from 'react-number-count-down';
import $ from 'jquery';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			targetAmount: 0,
			donatedAmount: 0,
			totalDonations:0,
			donationCount:0,
			targetDays:0,
			averageDonation:0,
			submitted:false
			
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSecondSubmit = this.handleSecondSubmit.bind(this);
		this.handleComplete = this.handleComplete.bind(this);

	}
    render() {
    	const showCounter = () => {
	    	if (this.state.submitted === true) {
	        		return (
		    	        <div>
		    	        	<section className="prelude">

		    		        	<header>
		    		        		<img src="../assets/crowdfunding.png" alt=""/>
		    		        		<h1>fund<span>Me</span></h1>
		    		        	</header>

		    			        <form className="firstForm" action="" onSubmit={this.handleSubmit}>
		    			          <div className="formItems">
		    				          <span className="formtxt">I want to raise $ </span>	
		    				          <NumberInput 
		    				          	inputID="targetAmount" 
		    				          	inputName="targetAmount" 
		    				          	recordChange={this.handleChange} 
		    				          	/>
		    				          <span className="formtxt"> in </span>
		    				          <NumberInput 
		    				          	inputID="targetDays" 
		    				          	inputName="targetDays" 
		    				          	recordChange={this.handleChange}
		    				          	/>
		    				          <span className="formtxt"> days !</span>
		    			          </div>
		    			          <input type="submit" value="Create a Custom Widget!"/>
		    			        </form>

		    		        </section>
		    		        <div id="scroll"></div>

		    		        
		    		        <div className="mainWidgetContainer" >
		    		        	<div className="mainWidget">
		    		        	<Progress 
		    		        		Completion={(this.state.totalDonations/this.state.targetAmount)*100} 
		    		        		Cumulative={parseInt(this.state.totalDonations).toLocaleString('en')}
		    		        		Target={parseInt(this.state.targetAmount).toLocaleString('en')}
		    		        		/>
		    		        	<Counter 
		    		        		dayTarget={parseInt(this.state.targetDays).toLocaleString('en')}
		    		        		handleComplete={this.handleComplete}
		    		        	/>
		    		        	<DonationsNumber
		    		        		donationsNum={parseInt(this.state.donationCount).toLocaleString('en')}
		    		        	/>
		    		        	<DonationForm 
		    		        		handleSubmit={this.handleSecondSubmit}
		    		        		inputID="donatedAmount"
		    		        		inputName="donatedAmount"
		    		        		recordChange={this.handleChange}

		    		        	/>
		    		        </div>
			    		        	<Buttons
			    		        		/>
		    		       </div>
		    	       </div>
	        		)
	        	}
	      else {  
      return (
        <div>
        	<section className="prelude">

	        	<header>
	        		<img src="../assets/crowdfunding.png" alt=""/>
	        		<h1>fund<span>Me</span></h1>
	        	</header>

		        <form className="firstForm" action="" onSubmit={this.handleSubmit}>
		          <div className="formItems">
			          <span>I want to raise $ </span>	
			          <NumberInput inputID="targetAmount" inputName="targetAmount" recordChange={this.handleChange} />
			          <span> in </span>
			          <NumberInput inputID="targetDays" inputName="targetDays" recordChange={this.handleChange}/>
			          <span> days !</span>
		          </div>
		          <input type="submit" value="Create a Custom Widget!"/>
		        </form>
		       

	        </section>
	         <div id="scroll"></div>
        </div>
        )
    	}
   	    }
   	    return(
   	    	<main>
   	    		{showCounter()}
   	    	</main>
   	    	)
   	    }
      
    
    handleSubmit(e){
    	e.preventDefault();
    	let targetAmount = parseInt(this.state.targetAmount);
    	let targetDays = parseInt(this.state.targetDays)

    	if(targetAmount <= 0 || targetDays <=0){
    		alert("Please enter positive values!")
    	}
    	else if(targetAmount > 10000000 || targetDays > 999){
    		alert("Please enter a target amount below $10 million and target days below 1000.")
    	}
    	else if (this.state.submitted === true){
    		alert("Please wait for your current campaign to end or refresh application to start again!")
    	}
    	else{
    	 $('html, body').animate({
                scrollTop: $("#scroll").offset().top
            }, 1000);
    	this.setState({
    		submitted:true,
    		totalDonations: 0,
    		averageDonation: 0,
    		donationCount:0

    		
    	});
    }

    }

    handleSecondSubmit(e){
    	e.preventDefault();
    	if(this.state.donatedAmount <= 0){
    		alert("Please enter a positive number that isn't 0")
    	}
    	else{
    	this.state.donationCount++;
    	let cumulative = parseInt(this.state.totalDonations) + parseInt(this.state.donatedAmount);
    	let average = Math.round(cumulative/this.state.donationCount);
    	this.setState({
    		totalDonations: cumulative,
    		averageDonation: average,

    	})
    	let form = document.getElementById('donationForm');
    	form.reset();
    }
    }

    handleChange(e){
    	this.setState({
    			[e.target.name]:e.target.value
    	})
    }
    handleComplete(){
    	if (this.state.totalDonations > this.state.targetAmount) {
    		alert(`Congrats! you raised $ ${parseInt(this.state.totalDonations).toLocaleString('en')} which is more your target amount`);
    	}
    	else if (this.state.totalDonations === this.state.targetAmount) {
    		alert(`Congrats! you raised $ ${parseInt(this.state.totalDonations).toLocaleString('en')} which is exactly your target amount`)
    	}
    	else {
    		alert(`You raised $ ${parseInt(this.state.totalDonations).toLocaleString('en')} which is less than your target amount please refresh the app to try again`)
    	}
    }
}

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
const Counter = (props) => {
	return(
	<div className="counter">
		<span>Only </span>
		<CountDown from={parseInt(props.dayTarget)} to={0} type={'-'} addon={'days left to fund this project'} interval={5} onComplete={props.handleComplete}/>	
	</div>
	)

}
const DonationsNumber = (props) => {
	return(
	<div>
		<p className="donationsNum">Join the {props.donationsNum} people who have already supported this project. Every Dollar Helps!</p>	
	</div>
	)
}
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
const Buttons = (props) => {
	return(
	<div className="buttons">
		<button>Share</button>
		<button>Remind Me Later</button>
	</div>
	)
}


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

ReactDOM.render(<App />, document.getElementById('app'));
