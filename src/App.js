import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';

class App extends Component {
  state = { counter: 0 };

  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
      counter: prevState.counter + incrementValue
    }));
  };


  render() {
    return (
      <div className="App">
        <div className="App-container">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
