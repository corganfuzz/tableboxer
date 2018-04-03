import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IButton from 'material-ui/RaisedButton';
// import ProgressMeter from '../components/ProgressMeter';

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
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     open: false,
  //   }
  // }
  //
  // handleOpen = () => {
  //   this.setState({
  //     open: true
  //   })
  // }
  //
  // handleClose = () => {
  //   this.setState({
  //     open: false
  //   })
  // }


  render () {

    return (
      <div>
        <Card
          style={styles.cardie}
        >
          <CardHeader
            title="INSTALL"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText
            expandable={true}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CardText>


          <IButton
            backgroundColor={this.props.backgroundColor}
            labelColor={this.props.labelColor}
            label={this.props.label}
            style={styles.button}
            onClick={this.props.handleOpen}
          />

        </Card>
      </div>
    );
  }
}
