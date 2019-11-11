import React, { Component } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "reactApp" };
  }

  // componentDidMount() {
  //   const user = {
  //     name: this.state.name
  //   };
  //   axios.get(`http://localhost:3001/greeting`, { user }).then(res => {
  //     const response = res.data.greeting;
  //     this.setState({ name: response });
  //   });
  // }
  render() {
    return (
      <div>
      <h1>Dashboard</h1>
        {/* <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Call API</h1>
        </header>
        <p className='App-intro'>{this.state.name}</p> */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
