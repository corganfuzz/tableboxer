import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import CircularProgress from "material-ui/CircularProgress";

class ProgressMeter extends Component {
  // state = {
  //     open: false
  //   }

  //this will be in another component

  //     handleOpen = () => {
  //       this.setState({
  //           open: true
  //       });
  //   }

  //     handleClose = () => {
  //         this.setState({
  //             open: false
  //         })
  //     }
  render() {

    const styles = {
      rightNum: {
        // color: 'red',
        fontSize: 45,
        position: "absolute",
        top: "52%",
        left: "11.5%",
        textAlign: "center"
      },
      span: {
        fontSize: 18,
        top: "68%",
        left: "10.5%",
        position: "absolute"
      },
      title: {
        backgroundColor: 'red',
        color: 'white'
      }
    };

    // console.log('progress', this.props.passedcfes)

    return (
      <Dialog
        title="Install selected app(s)"
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        titleStyle={styles.title}
        passedcfes={this.props.passedcfes}
      >
        <br/>
        <div className='row'>
          <div className='col-lg-6'>
            Selected CFEs:<br/>
            <span>{this.props.passedcfes}</span>
          </div>
          <div className='col-lg-6'>
            Selected Apps:
          </div>
        </div>

        <div className="row">

          <div className="col-lg-4">
            <br/>

            <CircularProgress
              mode="determinate"
              size={160}
              thickness={5}
              value={100}
            />

            <div style={styles.rightNum}>{this.props.passedcfes.length}</div>

            <br />

            <span style={styles.span}>CFE(s)</span>

          </div>
          <div className="col-lg-5">
            {/* <div style={styles.rightNum}> 4  </div> */}
          </div>

          <div className="col-lg-3">
            <CircularProgress
              // mode='determinate'
              size={160}
              thickness={5}
            />

            {/* <div style={styles.rightNum}> 4 </div> */}
          </div>
        </div>
      </Dialog>
    );
  }
}
export default ProgressMeter;
