import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Table} from 'react-materialize';

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
    axios.get(this.state.base_url+"?id=1")
    .then(function (response){
      console.log(response.data)
          })
    .catch(function (error){console.log(error)});
  }
/*  const PersonRow = (props) => {
  return (
    <tr>
      <td>
        { props.data.id }
      </td>
      <td>
        { props.data.name }
      </td>
    </tr>
  );
}*/
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to LeaderBoard</h2>
          <Table>
              <thead>
                <tr>
                  <th data-field="id">ID</th>
                  <th data-field="name">Name</th>
                  <th data-field="points">Points</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
                <tr>
                  <td>Alan</td>
                  <td>Jellybean</td>
                  <td>$3.76</td>
                </tr>
                <tr>
                  <td>Jonathan</td>
                  <td>Lollipop</td>
                  <td>$7.00</td>
                </tr>
              </tbody>
        </Table>

          <button onClick={this.getAllVolunteer.bind(this)} type="button">GET ALL Volunteer</button>

        </div>
        
      </div>
    );
  }
}

export default App;
// <input onChange={this.changeInput.bind(this)} placeholder={"Volunteer ID "} />
//<button onClick={this.getVolunteer.bind(this)} type="button">GET A Volunteer</button>
//"http://192.168.1.2:8000/lbfe_app/api/volunteeractivities/?volunteer_id=1"
