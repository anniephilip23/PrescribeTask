import React, { Component } from 'react';
import fire from './config/Fire';
import Login from './component/Login';
import Home from './component/Home';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authListener();
  }
// check any user is logged in and update user in state
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email)
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      // check if user logged in or not, if logged in render home component else render login component
      <div className="container-fluid" id="main">
        {this.state.user ? (<Home user={this.state.user.email} />) : (<Login />)}
      </div>
    );
  }
}

export default App;