import React from 'react';
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import HomePage from "./components/HomePage";


class App extends React.Component {
  render() {
    return (
      <Router>
          <Route path="/" exact component={HomePage}/>
      </Router>
    )
  }
}

export default App;