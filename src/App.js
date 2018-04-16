import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ContentViewer from "./components/ContentViewer";
// import BoxerNew from './components/BoxerNew';

import { Provider } from "react-redux";
import store from "./store";

//div on line 20 , right after muithemeprovider tag MUST BE THERE

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}>

        <MuiThemeProvider >

          <div>

            <AppBar
              title="Testing Redux"
              style={{ backgroundColor: "#744cbc" }}
            />

            <ContentViewer />

            {/* <BoxerNew /> */}

          </div>

        </MuiThemeProvider>

      </Provider>
    </div>
    );
  }
}

export default App;
