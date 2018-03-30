import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import checkboxHOC from "react-table/lib/hoc/selectTable";

import { connect } from 'react-redux';
import { fetchAppz } from '../actions/hostnameActions';

const CheckboxTable = checkboxHOC(ReactTable);


class AppBoxer extends Component {
  constructor() {
    super();

    this.state = {
      selection: [],
      row: [],
      selectAll: false
    };
  }


  componentWillMount () {
    this.props.fetchAppz()
  }

  getData(appitemz) {
      const data = appitemz.map(item => {

        return {
          // _id,
          ...item
        };
      });

      return data;
    }

   getColumns(data) {

           // console.log (data);

          if (data.length > 0) {

            const columns = [];

            const sample = data[0];


          Object.keys(sample).forEach(key => {

            if (key !== "stackDefId") {

              columns.push({
                accessor: key,
                Header: key.charAt(0).toUpperCase() + key.slice(1)
              });

            }
          });
          return columns;
        }
      }

  toggleSelection = (key, shift, row) => {

    let selection = [...this.state.selection];

    const keyIndex = selection.indexOf(key);

    if (keyIndex >= 0) {

      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];

    } else {
      selection.push(key);
    }
    this.setState({
      selection: selection,
      // row: row.hostname
      row: row
    });
  };
  //
  // //
  //
  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];

    if (selectAll) {
      const wrappedInstance = this.CheckboxTable.getWrappedInstance();

      const currentRecords = wrappedInstance.getResolvedState().sortedData;

      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }

    this.setState({ selectAll, selection });
  };
  //
  // //
  //
  isSelected = key => {
    return this.state.selection.includes(key);
  };

  logSelection = (selectedAppIds) => {

    selectedAppIds = this.state.selection


    // const {stackDefName} = this.props
    //
    // const selectedDevices = stackDefName.filter((stackDefName) => {
    //   return selectedAppIds.includes(stackDefName.deviceId)
    //
    // }).map((device) => (device.deviceName))
    //
    // console.log(selectedDevices)



  };

  render() {

    const hostitems = this.props.appz

    // console.log (hostitems)



      const data = this.getData(hostitems);

      // console.log(data)





      const columns = this.getColumns(data)
            // console.log(columns)

// This is for the first table

    // const columns = [
    //   {
    //     Header: "Host Name",
    //     accessor: "hostname" // String-based value accessors!
    //   },
    //   {
    //     Header: "PSL",
    //     accessor: "psl"
    //   },
    //   {
    //     Header: "Type",
    //     accessor: "model"
    //   },
    //   {
    //     Header: "Rig",
    //     accessor: "rig"
    //   }
    // ];

    const { toggleSelection, toggleAll, isSelected, logSelection } = this;

    const { selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox"
    };
    //



    return (
      <div>
          <h1>Fetching with redux </h1>
          {/* {hostitems} */}

      {
        this.props.appz.length > 0
      ?
             <CheckboxTable
                keyField="stackDefId"
                ref={r => (this.checkboxTable = r)}
                data={hostitems}
                columns={columns}
                defaultPageSize={10}
                {...checkboxProps}
              />

      : <div></div>
      }

<br/>
  <button onClick={logSelection}><h3>Console Log It </h3></button>
      </div>


    );
  }
}

const mapStatetoProps = state => ({
   appz: state.hostnames.itemz
})

export default connect(mapStatetoProps, { fetchAppz })(AppBoxer);
