import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";


const CheckboxTable = checkboxHOC(ReactTable);

class DeviceBoxer extends Component {

  render () {

    return (
      <div>
          <CheckboxTable
            keyField="deviceId"
            noDataText="Value not found"
            filterable
            ref={r => (this.checkboxTable = r)}
            data={this.props.data}
            columns={this.props.columns}
            defaultPageSize={10}
            toggleSelection={this.props.toggleSelection}
            isSelected={this.props.isSelected}
            selectType={this.props.selectType}
            selectAll={this.props.selectAll}
            toggleAll={this.props.toggleAll}
            // {...checkboxProps}
            // onClick={logSelection}
            // logSelection={this.props.logSelection}
          />
      </div>    )
  }
}

export default DeviceBoxer;
