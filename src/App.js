import React, { Component } from "react";
// import logo from "./logo.svg";
import AppBar from "material-ui/AppBar";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ContentViewer from "./components/ContentViewer";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider
        store={store}
      >

        <MuiThemeProvider>

          <div>

          <AppBar
            title="Testing Redux"
            style={{ backgroundColor: "#744cbc" }}
          />


            <ContentViewer />

          </div>

        </MuiThemeProvider>

      </Provider>

    );
  }
}

export default App;
