import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      id:' ',
      type: 'GET',
      base_url: 'http://192.168.1.2:8000/app/api/volunteer/',
      query: ' '
    };
  }

  changeInput(event){
    this.setState({id: event.target.value}, function () {console.log(this.state.id);});
  }

  getVolunteer(){ 
    axios.get(this.state.base_url+'?',
      {params: {volunteer_id: this.state.id}
    })
    .then(function (response){
      console.log(response.data)
          })
    .catch(function (error){console.log(error)});
  }

  getAllVolunteer(){
    axios.get(this.state.base_url)
    .then(function (response){
      console.log(response.data)
          })
    .catch(function (error){console.log(error)});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <input onChange={this.changeInput.bind(this)} placeholder={"Volunteer ID "} />
          <button onClick={this.getVolunteer.bind(this)} type="button">GET A Volunteer</button>
          <button onClick={this.getAllVolunteer.bind(this)} type="button">GET ALL Volunteer</button>

        </div>
        
      </div>
    );
  }
}

export default App;
