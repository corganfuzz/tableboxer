import React from "react";
import Checkbox from "material-ui/Checkbox";

const AppCheckBox = (props) => {
  return (
    <Checkbox
      type={props.selectType || 'checkbox'}
      style={{ textAlign: "left" }}
      checked={props.checked}
      onClick={e => {
        const { shiftKey } = e;
        e.stopPropagation();
        props.onClick(props.id, shiftKey, props.row);
      }}
    />
  )
}

export default AppCheckBox;
