import React, { Component } from 'react';
import BoxerNew from "./BoxerNew";
import AppBoxer from "./AppBoxer";
import Kard from "./Kard";
import ProgressMeter from './ProgressMeter';

const styles = {
  center: {
    margin: 20,
    padding: 20
  }
};

export default class ContentViewer extends Component {
  constructor (props) {
    super(props);

    this.cfeCallback = this.cfeCallback.bind(this)

    this.state = {
      open: false,
      cfes: []
    }
  }

  cfeCallback (selectedDevices) {
    this.setState({
      cfes:selectedDevices
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }


  render() {

    console.log('passed',this.state.cfes)

    return (
      <div style={styles.center}>
        <div className="row">
          <div className="col-xs-12">

            <Kard
              backgroundColor='#a4c639'
              labelColor='#FFF'
              label='INSTALL'
              handleOpen={this.handleOpen}
            />

            </div>
        </div>

        <br />

        <div className="row">
          <div className="col-xs-6">

            <BoxerNew
              cfecallback={this.cfeCallback}
            />

          </div>

          <div className="col-xs-6">

            <AppBoxer />

          </div>
        </div>
        {/* {
          this.state.cfes > 0
          ? */}
          <ProgressMeter
            title={this.props.title}
            modal={this.props.modal}
            open={this.state.open}
            handleClose={this.handleClose}
            passedcfes={this.state.cfes}
          />

      </div>
    );
  }
}
