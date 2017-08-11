import React, {Component} from 'react';
// import NavLink from './NavLink'

import './style.css';

class App extends Component {
  render() {
    return (
        <div className='App'>
          {/*<div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            <NavLink to="/" onlyActiveOnIndex>Home</NavLink>
            <NavLink to="/people">People</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/1234">4044</NavLink>
          </p>*/}
          {this.props.children}
        </div>
    );
  }
}

export default App;
