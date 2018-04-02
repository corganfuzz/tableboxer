import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IButton from 'material-ui/RaisedButton';
import ProgressMeter from '../components/ProgressMeter';

const styles = {
  cardie:{
    width: 250,
    height: 'auto',
  },
  button:{
    width: '100%',
    padding: 5
  }
}



export default class Kard extends Component {
  constructor(props) {
    super(props);

    // this.handleOpen = this.handleOpenParent.bind(this)
    // this.handleClose = this.handleClose.bind(this)

    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })

    // console.log(this.state.open)
  }

  handleClose = () => {
    this.setState({
      open: false
    })

    // console.log('bro',this.state.open)
  }


  render () {

    return (
      <div>
        <Card
          style={styles.cardie}
        >
          <CardHeader
            title="INSTALL"
            // subtitle="Install some bruh"
            actAsExpander={true}
            showExpandableButton={true}
          />

              <CardText
                expandable={true}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.

              </CardText>

          <IButton
            backgroundColor="#a4c639"
            labelColor="#FFF"
            label="INSTALL"
            style={styles.button}
            onClick={this.handleOpen}

          />

              <ProgressMeter
                title={this.props.title}
                modal={this.props.modal}
                open={this.state.open}
                handleClose={this.handleClose}
              />

        </Card>
      </div>
    );
  }
}
