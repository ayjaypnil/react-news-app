import React, { Component } from "react";
import Nav from "./components/Nav";
import Jumbo from "./components/Jumbo";
import Search from "./components/Search";
import Results from "./components/Results";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Jumbo />
        <Search />
   
      </div>
    );
  }
}

export default App;

