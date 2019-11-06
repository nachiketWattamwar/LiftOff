import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {name: "reactApp"};
  }

  componentDidMount(){
    const user = {
      name: this.state.name
    };
    axios.get(`http://localhost:3001/greeting`, {user})
      .then(res => {
        const response = res.data.greeting;
        this.setState({ response});
      })
  }
  render(){
    return(
      <div className = "App">
        <header className = "App-header">
          <img src = {logo} className ="App-logo" alt = "logo"/>
          <h1 className="App-title">Call API</h1>
        </header>
        <p className="App-intro">{this.state.name}</p>

      </div>
    );
  }
}

export default App;
