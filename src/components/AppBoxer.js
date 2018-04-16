import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class AppBoxer extends Component {
  constructor (props){
    super (props);

    this.state = {
      initialApp: []
    }
  }

  componentWillReceiveProps(nextProps) {

    // console.log("APPBOXER YO", nextProps);

    this.setState({
      initialApp: nextProps.CompatApps
    })

    // if (nextProps.switcher === true) {
    //   this.setState({ initialApp: this.props.Appdata })
    // }
    // else {
    //   this.setState({ initialApp: [] })
    // }

    switch (nextProps.switcher) {

      case true:
      return this.setState({ initialApp: this.props.Appdata })
      // this.props.data.length = 0;

      // case false:
      //   return this.setState({ initialApp: [] })
      // this.props.data.push(this.props.data)

      default:
          return []
    }


    // if (nextProps.switcher === true) {
    //   this.setState({ initial: this.props.Appdata });
    // } else {
    //   this.setState({ initial: [] });
    // }
  }



  render () {
    return (
      <div>
          <CheckboxTable
            keyField="versionId"
            filterable
            noDataText="No Compatible Applications"
            ref={x => (this.checkboxTable = x)}
            data={this.state.initialApp}
            columns={this.props.Appcolumns}
            defaultPageSize={10}
            toggleSelection={this.props.toggleAppSelection}
            isSelected={this.props.isAppSelected}
            selectType={this.props.selectType}
            selectAll={this.props.selectAllApps}
            // toggleAll={this.props.toggleAllApps}
          />
      </div>
    );
  }
}
export default AppBoxer;

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
