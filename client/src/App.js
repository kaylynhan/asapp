import React from 'react';
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import SchedulePage from './components/SchedulePage';
//import NavigationBar from "./components/NavigationBar";


class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/SchedulePage" exact component={SchedulePage} />
      </Router>
    )
  }
}

export default App;
