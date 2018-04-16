import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";

class Gerald extends Component {

  render() {
    return (

      <Checkbox
        type={this.props.selectType || 'checkbox'}
        // inputStyle={styles.yolookInput}
        style={{ textAlign: "left" }}
        checked={this.props.checked}
        ref={'ref_'}
        onClick={e => {
          const { shiftKey } = e;

          e.stopPropagation();



          this.props.onClick(this.props.id, shiftKey, this.props.row);

          // console.log(props.checked)
        }}
      />


    );
  }
}

export default Gerald;
