import React from 'react';
import lb from "./media/LBFE-Logo.png";
import fb from "./media/FB.png"
import gg from "./media/GG.png"
import "./css/App.css";
import {Button,Row,Input} from 'react-materialize';

export default class App extends React.Component {
constructor(){
	super();
	this.state = {
		email:"example@gmail.com",
		password:"*******"
	};
}
	changeCredential(email,password){
		this.setState({email});
		this.setState({password});
	}
	click(){
		console.log("I've been clicked!")
	}

  render() {
    return (
    	<div className="center">
    		<div><img className="circle responsive-img" src={lb} alt="little brothers" height="150" width="150"/></div>
    		<Button className="register-bt" waves='light' onClick={this.click}>Register</Button>

    		<div>
                <Row>
                    <Input s={12} label="Email" type="email" required/>
                </Row>

                <Row>
                    <Input  s={12} label="Password" type="password" required/>
                </Row>
            </div>  

    		  <button onClick={this.click} className="waves-effect waves-light btn" type="button">SIGN IN</button>

    		<div className="fb_space"><a href="https://www.facebook.com/"><img src={fb} alt="facebook log in" height="50" width="200"/> </a></div>
    		<div className="gg_space"><a href="https://www.google.com/"> <img src={gg} alt="google log in" height="50" width="200"/> </a></div>
    	</div>
    );
  }
}

// <Credential title={"Email"} placeholder={this.state.email} changeCredential={this.changeCredential.bind(this)} type={"text"}/>
 //<Credential title={"Password"} placeholder={this.state.password} changeCredential={this.changeCredential.bind(this)} type={"password"}/>