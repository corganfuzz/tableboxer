import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import testData from "./test_data";
// import Chance from "chance";
import shortid from 'shortid';

const CheckboxTable = checkboxHOC(ReactTable);

// const chance = new Chance();
// const shortid = new Shortid();

function getData() {
  const data = testData.map(item => {
    // const _id = chance.guid();
       const _id = shortid.generate()

    return {
      _id,
      ...item
    };
  });

  return data;
}

function getColumns(data) {

  const columns = [];

  const sample = data[0];

  Object.keys(sample).forEach(key => {
    if (key !== "_id") {
      columns.push({
        accessor: key,
        Header: key
      });
    }
  });
  return columns;
}

class Boxer extends Component {
  constructor() {
    super();
    const data = getData();
    const columns = getColumns(data);

    this.state = {
      data,
      columns,
      selection: [],
      shift: [],
      row: [],
      selectAll: false
    };
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
      shift: shift,
      row: row
    });
  };

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

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  logSelection = () => {
    console.log("selection:", this.state.selection);
      // console.log("shift:", this.state.shift);


        console.log("row:", this.state.row);
        console.log("fname:", this.state.row.first_name);


  };

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;

    const { data, columns, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox"
    };

    return (
      <div>
        <button onClick={logSelection}>Log Selection</button>

        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          defaultPageSize={10}
          {...checkboxProps}
        />
      </div>
    );
  }
}
export default Boxer;
