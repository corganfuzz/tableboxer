import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import checkboxHOC from "react-table/lib/hoc/selectTable";

import { connect } from 'react-redux';
import { fetchHosts } from '../actions/hostnameActions';

const CheckboxTable = checkboxHOC(ReactTable);

// const chance = new Chance();
// const shortid = new Shortid();

class BoxerNew extends Component {
  constructor() {
    super();

    this.state = {
      // data,
      // columns,
      selection: [],
      row: [],
      selectAll: false
    };
  }


  componentWillMount () {
    this.props.fetchHosts()
  }

  getData(hostitems) {
      const data = hostitems.map(item => {

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

            if (key !== "id") {

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

  logSelection = (indexes) => {

    indexes = this.state.selection

    // console.log(this.props.hostnames)

    const selectedIndexes = indexes.map(x => this.props.hostnames[x-1].hostname)
    //
    // console.log('selection:', this.state.selection);
    // // console.log('data:', this.state.data)
    // //
    console.log(selectedIndexes)


  };

  render() {

    const hostitems = this.props.hostnames

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

    const {selectAll } = this.state;

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
        this.props.hostnames.length > 0
      ?
             <CheckboxTable
                keyField='id'
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
  hostnames: state.hostnames.items
})

export default connect(mapStatetoProps, { fetchHosts })(BoxerNew);
