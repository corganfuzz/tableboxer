import React, { Component } from "react";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

const CheckboxTable = checkboxHOC(ReactTable);

class DeviceBoxer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDev: [],
    };
  }

  // componentDidMount () {
  //   this.props.onRef(this)
  // }

  // componentWillUnmount() {
  //   this.props.onRef(undefined)
  // }

  componentWillMount () {
    // let emptyArray = this.props.data.slice(0);
    // emptyArray.length = 0;

    this.setState({
      initialDev: this.props.karl
    });

  }

  componentWillReceiveProps(nextProps) {


    // console.log("DEVICEBOXER YO", nextProps);
    // let emptyArray = this.props.data.slice(0)
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
    // this.setState({
    //   initial: nextProps.CompatDevs
    // })
    this.setState({
      initialDev: nextProps.CompatDevs,
    })

    if (nextProps.switcher === false) {
      this.setState({
        initialDev: this.props.data
      });
    }
  }

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];

    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();

      const currentRecords = wrappedInstance.getResolvedState().sortedData;

      console.log('wrap1',currentRecords)

      currentRecords.forEach(item => {
        selection.push(item._original.deviceId);
      });

      currentRecords.length = 0
    }

    // this.setState({ selectAll, selection });
  };

  render() {

    const { toggleAll } = this;

    const Propers = {
      toggleAll
    }

    // console.log('final', this.state.initial)

    return (
      <div>
        <CheckboxTable
          keyField="deviceId"
          noDataText="No Compatible Devices"
          filterable
          // onRef={this.props.onRef}
          ref={r => (this.checkboxTable = r)}
          data={this.state.initialDev}
          columns={this.props.columns}
          defaultPageSize={10}
          toggleSelection={this.props.toggleSelection}
          isSelected={this.props.isSelected}
          selectType={this.props.selectType}
          SelectInputComponent={this.props.SelectInputComponent}
          // selectAll={this.props.selectAll}
          // toggleAll={this.toggleAll}
          {...Propers}
          // getTrProps={this.props.getTrProps}
        />
      </div>
    );
  }
}

export default DeviceBoxer;
