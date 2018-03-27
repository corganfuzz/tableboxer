import React, { Component } from "react";
// import logo from "./logo.svg";
import AppBar from 'material-ui/AppBar';
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ContentViewer from './components/ContentViewer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>

        <AppBar
          title='Testing Redux'
          style={{backgroundColor: '#744cbc'}}
        />
        <div className="App">

          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header> */}

           <ContentViewer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
