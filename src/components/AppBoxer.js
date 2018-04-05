import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class AppBoxer extends Component {
  render() {
    return (
      <div>

          <CheckboxTable
            keyField="stackDefId"
            filterable
            noDataText="Value not found"
            ref={x => (this.checkboxTable = x)}
            data={this.props.Appdata}
            columns={this.props.Appcolumns}
            defaultPageSize={10}
            toggleSelection={this.props.toggleAppSelection}
            isSelected={this.props.isAppSelected}
            selectType={this.props.selectType}
            selectAll={this.props.selectAllApps}
            toggleAll={this.props.toggleAllapps}
          />

        {/* <br />
        <button onClick={logSelection}>
          <h3>Console Log It </h3>
        </button> */}
      </div>
    );
  }
}

export default AppBoxer;
