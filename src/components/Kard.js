import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import IButton from 'material-ui/RaisedButton';


const styles = {
  cardie:{
    width: 250,
    height: 200,
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
            subtitle="Install some bruh"
            actAsExpander={false}
            showExpandableButton={true}
          />
          <CardText
            expandable={false}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          </CardText>

          <IButton
            backgroundColor="#a4c639"
            labelColor="white"
            label="INSTALL"
            style={styles.button}
          />

        </Card>
      </div>
    );
  }
}
