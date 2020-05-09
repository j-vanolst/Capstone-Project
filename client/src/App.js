import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' }
  }
  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }
  componentDidMount() {
    this.callAPI()
  }
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" width="100px"></img>
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}

export default App