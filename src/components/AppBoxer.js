import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

class AppBoxer extends Component {
  constructor (props){
    super (props);

    this.state = {
      initial: []
    }
  }

  componentWillReceiveProps(nextProps) {

    // console.log ('nexterApps',nextProps)

    console.log('redux', this.props.Appdata)

    const parentvalue = nextProps.value

    this.setState({
      initial: parentvalue
    })

    if (nextProps.switcher === true) {
      this.setState({ initial: this.props.Appdata })
    }


    // if (nextProps.switcher === true) {
    //   this.setState({ initial: this.props.Appdata });
    // } else {
    //   this.setState({ initial: [] });
    // }
  }



    // const selectx = this.state.selectx
    // //
    // // console.log('here', selectx)
    // //
    // if(selectx.length > 0){
    //   this.props.fetchComptAppz(selectx)
    //
    //   // console.log ('dude', this.props.fetchComptAppz(selectx))
    // }

    //
    //  if(this.state.selectx.length > 0){
    //
    //   const bro = this.props.fetchComptAppz(selectx)
    //
    // // this.setState({
    // //   passedUri: bro
    // // })
    // //
    //   console.log(bro)
    //
    // }

  render () {
    return (
      <div>
          <CheckboxTable
            keyField="versionId"
            filterable
            noDataText="No Compatible Applications"
            ref={x => (this.checkboxTable = x)}
            data={this.state.initial}
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
