import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import { connect } from 'react-redux';
import { fetchComptAppz } from '../actions/hostnameActions';

const CheckboxTable = checkboxHOC(ReactTable);

class AppBoxer extends Component {
  constructor (props){
    super (props);

    this.state = {
      selectx: [],
      passedUri : []
    }
  }

  componentWillReceiveProps(nextProps) {

    const passedSelection = nextProps.selection

    this.setState({
      selectx: passedSelection
    })

  }


  // componentWillMount () {
  //   // const selected = this.props.selection
  //   // this.props.fetchComptAppz(this.state.selectx)
  // }


  render () {

    const selectx = this.state.selectx

    if(this.state.selectx.length > 0){
      this.props.fetchComptAppz(selectx)
    }

    console.log (this.state.selectx)
    // console.log(this.props.compatapps)

    return (
      <div>
          <CheckboxTable
            keyField="stackDefId"
            filterable
            noDataText="Select a device..."
            ref={x => (this.checkboxTable = x)}
            data={this.state.passedUri}
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

const mapStatetoProps = state => ({
  compatapps: state.hostnames.selectionApps
})

// function mapStatetoProps(state) {
//   const props = {compatapps: state.hostnames.selectionApps}
//   console.log(props)
//   return props;
// }


export default connect(mapStatetoProps, { fetchComptAppz })(AppBoxer);

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
