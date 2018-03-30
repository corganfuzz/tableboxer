import React, { Component } from 'react';
import BoxerNew from './BoxerNew';
import AppBoxer from './AppBoxer';
import Kard from './Kard';

const styles = {
  center: {
    margin: 20,
    padding: 20
  }
};

export default class ContentViewer extends Component {
  render() {
    return (
      <div style={styles.center}>
        <div className="row">
          <div className="col-xs-12">
            <Kard />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xs-6">
            <BoxerNew />
          </div>

          <div className="col-xs-6">
            <AppBoxer />
          </div>
        </div>
      </div>
    );
  }
}
