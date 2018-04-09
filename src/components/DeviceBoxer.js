import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

const DeviceBoxer = (props) => {
  console.log('props', props);
    return (
      <div>
          <CheckboxTable
            keyField="deviceId"
            noDataText="Value not found"
            filterable
            ref={r => (this.checkboxTable = r)}
            data={props.data}
            columns={props.columns}
            defaultPageSize={10}
            toggleSelection={props.toggleSelection}
            isSelected={props.isSelected}
            selectType={props.selectType}
            selectAll={props.selectAll}
            toggleAll={props.toggleAll}
            // {...checkboxProps}
            // onClick={logSelection}
            // logSelection={this.props.logSelection}
          />
      </div>
    );
}

export default DeviceBoxer;
