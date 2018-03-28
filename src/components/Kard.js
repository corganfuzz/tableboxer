import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IButton from 'material-ui/RaisedButton';


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
          />

        </Card>
      </div>
    );
  }
}
