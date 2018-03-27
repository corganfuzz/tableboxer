import React, {Component} from 'react';
import BoxerNew from './BoxerNew';
import Kard from './Kard'

const styles = {
  center:{
    margin:20,
    padding:20
  }
}

export default class ContentViewer extends Component {
  render () {
    return (
      <div style={styles.center}>

        <Kard />

        <br/>

        <BoxerNew/>

      </div>
    );
  }
}
