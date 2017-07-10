import React from 'react';
import "../css/Credential.css";

export default class Credential extends React.Component {
  handleChange(e){
  	const placeholder = e.target.value;
  	if (this.props.title === "Email"){
	this.props.changeCredential(placeholder,null);
  	}
  	else if (this.props.title === "Password"){
  	this.props.changeCredential(null,placeholder);	
  	}
  	 //console.log(placeholder);
  }
  render() {
    return (
    	<label> 
    	<div>
    	<h3>{this.props.title}</h3> 
    	<input onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder} type={this.props.type} required/>
    	</div>
    	</label>
    );
  }
}

/* to do:
	format email and password input box to be aligned verticaly
*/

/* notes:
	props is used for giving data to another class/component(i.e. child component) data cannot go up the tree, but it can go down
	label: if the user clicks on the text within the label element, it toggles the control
*/