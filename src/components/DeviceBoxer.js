import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class DeviceBoxer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: this.props.data,
      passedUri: [] //delete it if needed
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nexter", nextProps);

    // switch (nextProps.switcher) {
    //
    //   case true:
    //   return this.setState({ initial: [] })
    //   // this.props.data.length = 0;
    //
    //   case false:
    //     return this.setState({ initial: this.props.data})
    //   // this.props.data.push(this.props.data)
    //
    //   default:
    //       return this.props.data
    // }

    if (nextProps.switcher === true) {
      this.setState({ initial: [] });
    } else {
      this.setState({ initial: this.props.data });
    }
  }

  render() {
    return (
      <div>
        <CheckboxTable
          keyField="deviceId"
          noDataText="No Compatible Devices"
          filterable
          ref={r => (this.checkboxTable = r)}
          data={this.state.initial}
          columns={this.props.columns}
          defaultPageSize={10}
          toggleSelection={this.props.toggleSelection}
          isSelected={this.props.isSelected}
          selectType={this.props.selectType}
          SelectInputComponent={this.props.SelectInputComponent}
          selectAll={this.props.selectAll}
          toggleAll={this.props.toggleAll}
          // {...checkboxProps}
          // onClick={logSelection}
          // logSelection={this.props.logSelection}
        />
      </div>
    );
  }
}

export default DeviceBoxer;
