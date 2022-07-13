import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar/Navbar';
import News from './Component/News/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={2}/>
      </div>
    )
  }
}