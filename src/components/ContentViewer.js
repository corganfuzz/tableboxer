import React, { Component } from 'react';
import DeviceBoxer from "./DeviceBoxer";
import AppBoxer from './AppBoxer'
import Kard from "./Kard";
import ProgressMeter from './ProgressMeter';
import { Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import Toggle from "material-ui/Toggle";

import { connect } from 'react-redux';
import { fetchHosts } from '../actions/hostnameActions';
import { fetchAppz } from "../actions/hostnameActions";
// import axios from 'axios';
import { fetchComptAppz } from '../actions/hostnameActions';

const styles = {
  center: {
    margin: 20,
    padding: 20
  },
  label: {
    color: '#8b8b8b',
    fontSize: 16
  }
};


// const BASE_URL = "https://johnsaidlongernameisbetter.azurewebsites.net/get_compat_apps/?list=";



class ContentViewer extends Component {
  constructor (props) {
    super(props);

    // this.cfeCallback = this.cfeCallback.bind(this)

    this.state = {
      open: false,
      // loading: false,
      selection: [],
      selectAll: false,
      cfes: [],

      Appselection: [],
      selectAllApps: false,
      appz: [],

      comptAppsId: [],
      test:[],
      value: []


    }
  }


  onFilteredChange(column, value) {
    this.filtering = true;
  }


  componentWillMount() {

    this.props.fetchHosts();
    this.props.fetchAppz();


    // if (this.state.selection.length > 0) {
    //
    //     this.props.fetchComptAppz();
    //
    // }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.compatapps) {
      this.setState({ value: nextProps.compatapps})
    }
    // console.log('newpropers', nextProps)
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

// ---> get columns for both tables

  getColumns(data, tag) {
    // console.log (data);

    if (data.length > 0) {

      const columns = [];

      const sample = data[0];

      Object.keys(sample).forEach(key => {
        if (key !== tag) {
          columns.push({
            accessor: key,
            Header: key.charAt(0).toUpperCase() + key.slice(1)
          });
          // console.log(columns)
        }
      });
      return columns;
    }
  }


// ---> toggleSelection for both tables

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
    });
    console.log('up', selection)

    this.props.fetchComptAppz(selection);


  };

  toggleAppSelection = (key, shift, row) => {

    let Appselection = [...this.state.Appselection];

    const keyIndex = Appselection.indexOf(key);

    if (keyIndex >= 0) {
      Appselection = [
        ...Appselection.slice(0, keyIndex),
        ...Appselection.slice(keyIndex + 1)
      ];
    } else {
      Appselection.push(key);
    }
    this.setState({
      Appselection: Appselection,
      // loading: false
      // row: row
    });
  };

// ---> end

// ---> Toggle All for both tables

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

  // ---> second one

  toggleAllApps = () => {
    const selectAllApps = this.state.selectAllApps ? false : true;
    const Appselection = [];

    if (selectAllApps) {
      const wrappedInstance = this.CheckboxTable.getWrappedInstance();

      const currentRecords = wrappedInstance.getResolvedState().sortedData;

      currentRecords.forEach(item => {
        Appselection.push(item._original._id);
      });
    }

    this.setState({ selectAllApps, Appselection });
  };

  // ---> end

  // ---> isSelected for both tables

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  isAppSelected = key => {
    return this.state.Appselection.includes(key);
  };

  // ---> end

  // ---> here we combine both selections in 1 function

  logSelection = (selectedDeviceIds, selectedAppIds) => {

    selectedDeviceIds = this.state.selection;
    selectedAppIds = this.state.Appselection;

    // const selectedIndexes = selectedDeviceIds.map(x => this.props.hostnames[x-1])
    //
    const { hostnames, appz } = this.props;

    const selectedDevices = hostnames
      .filter(hostname => {
        return selectedDeviceIds.includes(hostname.deviceId);
      })
          .map(device => device.deviceName);

    const selectedAppz = appz
      .filter(appz => {
        return selectedAppIds.includes(appz.stackDefId);
      })
          .map(app => app.stackDefName);

      // this.props.cfecallback(selectedDevices)

      this.setState({ cfes: selectedDevices})
      this.setState({ appz: selectedAppz})

    console.log(selectedDevices);
    console.log(selectedAppz)
  };

  // handleClicker = (joined) => {
  //
  //   // x = this.state.test
  //
  //   // const self = this;
  //
  //     axios
  //       .get(BASE_URL + "[" + joined + "]")
  //         .then(response => {
  //           const yo = response.data;
  //           //
  //           // console.log ('yo', yo)
  //
  //           this.setState({
  //             value: yo
  //           });
  //               // console.log('yo', this.state.value)
  //         })
  //
  //       .catch( function(error){
  //         console.log(error);
  //       });
  //
  // }


  handleOpen = () => {
    this.setState({
      open: true
    })

    this.logSelection();
    // this.logIds();
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  //   ?list=[" + selectedData.join() + "];




  // handleChildFunc = (arr, evt) => {
  //   console.log('here', arr)
  // }
  //
  // handleChange (e) {
  //       var myInput = this.state.test;
  //       this.setState({
  //         value: myInput
  //       })
  //       this.props.fetchComptAppz(this.state.test, myInput);
  //
  //     }


  render() {

    // const MyCheckbox = (props) => {
    //   return (
    //     <input
    //       type={props.selectType || 'checkbox'}
    //
    //       checked={props.checked}
    //
    //       onClick={(e) => {
    //
    //         const { shiftKey } = e;
    //
    //         e.stopPropagation();
    //
    //         props.onClick(props.id, shiftKey, props.row);
    //
    //         const test = JSON.parse("[" + props.id+ "]") // to convert to array
    //
    //         const joined = this.state.test.concat(test)
    //
    //           this.setState({
    //             test: joined
    //           })
    //
    //           console.log('joined', joined)
    //
    //             this.handleClicker(joined);
    //
    //         // console.log('propers', props)
    //
    //
    //
    //         // console.log ('state', this.state.test)
    //
    //           // console.log("joined", joined);
    //
    //           // var joined = []
    //           //
    //           // if (props.checked === false) {
    //           //
    //           //   joined = this.state.test.concat(test) // to have multiple values inside array
    //           //
    //           //   this.handleClicker(joined);
    //           //
    //           //   this.setState({
    //           //     test: joined
    //           //   })
    //           //
    //           //   console.log('joined', joined);
    //           //
    //           // } else {
    //           //
    //           //     // function remove(array, element) {
    //           //     //   return array.filter(e => e !== element)
    //           //     // }
    //           //
    //           //     joined = joined.filter(a => a !== props.id)
    //           //
    //           //     // const result = remove(joined, props.id)
    //           //     // const result = joined.slice(0)
    //           //
    //           //     // for (let i =0; i<joined.length; i++) {
    //           //     //
    //           //     //   let newp = joined[i];
    //           //     //
    //           //     //   console.log('new', newp)
    //           //     //
    //           //     // }
    //           //
    //           //     // let giveId = joined.map( x => joined[x])
    //           //
    //           //     // const selectedA = props.id
    //           //     //
    //           //     // console.log('give', selectedA)
    //           //
    //           //     //
    //           //     console.log('result', joined)
    //           //
    //           //   }
    //
    //             //   else {
    //             //
    //             // }
    //
    //             // const selectedDs =
    //             //   .filter(joint => {
    //             //     return joined.includes();
    //             //   })
    //             //   .map(deviceId => deviceId.id)
    //             //
    //             //   console.log('selectedDs', selectedDs)
    //             //
    //
    //
    //
    //
    //       }}
    //       onChange={() => {
    //
    //       }}
    //     />
    //   )
    // }

    // const compat = this.props.compatapps
    // console.log('bro', compat)
    // this.props.fetchComptAppz(this.state.test); INFINITE LOOP
    // console.log(this.props.compatapps)

    //===>FROM REDUX
    const appz = this.props.appz
    const hostitems = this.props.hostnames;
    // console.log (appz)

    //===>SEPARATOR
    const data = this.getData(hostitems);
    const Appdata = this.getData(appz);
    // console.log(data)

    //===>SEPARATOR
    const columns = this.getColumns(data,"deviceId");
    const Appcolumns = this.getColumns(Appdata,"stackDefId")
    // console.log(columns)

    //===>SEPARATOR
    const { toggleSelection, toggleAppSelection,
            toggleAll, toggleAllapps,
            isSelected, isAppSelected } = this;
    const { selectAll, selectAllApps } = this.state;

    //===>SEPARATOR
    const checkboxProps = {
      toggleSelection,
      toggleAll,
      selectAll,
      isSelected,
      // logSelection,
      // SelectInputComponent: MyCheckbox,
      selectType: "checkbox"
    };

    const AppCheckboxProps = {
      toggleAppSelection,
      toggleAllapps,
      selectAllApps,
      isAppSelected,
      // logSelection,
      selectType: "checkbox"
    };

    // console.log('state', this.state.test)
    // const test = this.state.test
    const value = this.state.value
    // const pselection = this.state.selection

    // console.log('value', this.state.value)
    //
    // console.log('test', this.state.test)



    return (
      <div style={styles.center}>
        <div className="row">
          <div className="col-xs-12">

            <Kard
              backgroundColor='#a4c639'
              labelColor='#FFF'
              label='INSTALL'
              handleOpen={this.handleOpen}
            />

            </div>
        </div>

        <br />

        <div className="row">
          <div className="col-xs-12">
            <Toolbar>
              <ToolbarGroup>
                <Toggle
                  label="Filter by CFE"
                  labelPosition="right"
                  labelStyle={styles.label}
                />
                {/* <ToolbarTitle text="Filter by CFE" /> */}
                {/* <ToolbarSeparator /> */}
              </ToolbarGroup>

            </Toolbar>
          </div>
          <div className="col-xs-6"></div>
        </div>


        <div className="row">
          <div className="col-xs-6">
        {
          this.props.hostnames.length > 0
          ?
            <DeviceBoxer
              // selectionx={this.handleChildFunc}
              // cfecallback={this.cfeCallback}
              data={hostitems}
              columns={columns}
              {...checkboxProps}
            />
          :<div></div>
        }
          </div>

          <div className="col-xs-6">
        {
          this.props.appz.length > 0
          ?
            <AppBoxer
              Appdata={appz}
              Appcolumns={Appcolumns}
              {...AppCheckboxProps}
              value={value}
              // test={test}
              // selection={pselection}
            />
          :<div></div>
        }
          </div>
        </div>
        {
          this.state.cfes.length > 0
          ?
          <ProgressMeter
            title={this.props.title}
            modal={this.props.modal}
            open={this.state.open}
            handleClose={this.handleClose}
            passedcfes={this.state.cfes}
            passedappz={this.state.appz}
          />
          : <div></div>
        }
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  hostnames: state.hostnames.items,
  appz: state.hostnames.itemz,
  compatapps: state.hostnames.selectionApps
});

export default connect(mapStatetoProps, { fetchHosts, fetchAppz, fetchComptAppz })(ContentViewer);
