import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    rightNum:{
        // color: 'red',
        fontSize: 45,
        position: 'absolute',
        top: '41%',
        left: '11.5%',
        textAlign: 'center'
    },
    span:{
        fontSize: 18,
        top: '61%',
        left: '10.5%',
        position: 'absolute',
    }
}

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


    render () {

        // const {handleClose} = this.props

        return(

            <Dialog
                title='Install selected app(s)'
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
            >

                <div className='row'>
                    <div className='col-lg-4'>

                        <CircularProgress
                            mode='determinate'
                            size={160}
                            thickness={5}
                            value={100}
                        />

                        <div style={styles.rightNum}>
                            4
                        </div>
                        <br/>
                        <span style={styles.span}>CFE(s)</span>

                    </div>
                    <div className='col-lg-5'>


                    {/* <div style={styles.rightNum}> 4  </div> */}

                </div>
                <div className='col-lg-3'>
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
export default ProgressMeter