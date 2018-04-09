import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class AppBoxer extends Component {

  componentWillReceiveProps (nextProps) {

  }


  render () {
    return (
      <div>
          <CheckboxTable
            keyField="stackDefId"
            filterable
            noDataText="Select a device..."
            ref={x => (this.checkboxTable = x)}
            data={[]}
            columns={this.props.Appcolumns}
            defaultPageSize={10}
            toggleSelection={this.props.toggleAppSelection}
            isSelected={this.props.isAppSelected}
            selectType={this.props.selectType}
            selectAll={this.props.selectAllApps}
            toggleAll={this.props.toggleAllapps}
          />
      </div>
    );
  }
}
export default AppBoxer

// const AppBoxer = (props) => {
//
//     return (
//       <div>
//           <CheckboxTable
//             keyField="stackDefId"
//             filterable
//             noDataText="Select a device..."
//             ref={x => (this.checkboxTable = x)}
//             data={[]}
//             columns={props.Appcolumns}
//             defaultPageSize={10}
//             toggleSelection={props.toggleAppSelection}
//             isSelected={props.isAppSelected}
//             selectType={props.selectType}
//             selectAll={props.selectAllApps}
//             toggleAll={props.toggleAllapps}
//           />
//       </div>
//     );
// }
//
// export default AppBoxer;
