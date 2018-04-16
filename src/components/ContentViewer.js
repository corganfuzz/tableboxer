import React, { Component } from "react";
import DeviceBoxer from "./DeviceBoxer";
import AppBoxer from "./AppBoxer";
import Kard from "./Kard";
import ProgressMeter from "./ProgressMeter";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Toggle from "material-ui/Toggle";
// import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import {
  fetchHosts,
  fetchAppz,
  fetchComptAppz,
  fetchComptDevs
} from "../actions/hostnameActions";

import Gerald from './Gerald';



const styles = {
  center: {
    margin: 20,
    padding: 20
  },
  label: {
    color: '#8b8b8b',
    fontSize: 16
  },
  span: {
    width: 150,
    color: '#8b8b8b'
  }
};



// const BASE_URL = "https://johnsaidlongernameisbetter.azurewebsites.net/get_compat_apps/?list=";

class ContentViewer extends Component {
  constructor (props) {
    super(props);

    // this.cfeCallback = this.cfeCallback.bind(this)

    this.state = {
      open: false,

      selection: [],
      selectAll: false,
      cfes: [],
      CompatApps: [],

      Appselection: [],
      selectAllApps: false,
      appz: [],
      CompatDevs: [],

      ichecked: false,
      value:[]

    }
  }


  onChange = (e, i) => {

    // let value = this.state.value.slice()

    // const value = e.target.checked

    // const test = JSON.parse("[" + value + "]")

    // const joined = this.state.value.concat(value)

    // this.setState({
    //     value:[...this.state.value, value]
    // })

    // value[i] = e.target.checked;

    // console.log('value', this.state.value)
    // // this.setState({value})

    // console.log ('e', e)
    // console.log('i', i)

    // console.log('after', this.state.value)

  }

  unChecker = () => {

  }

  componentWillMount() {

    this.props.fetchHosts();
    this.props.fetchAppz();
    // value: props.checked
    // if (this.state.selection.length > 0) {
    //     this.props.fetchComptAppz();
    // }
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.compatapps) {
      this.setState({
        CompatApps: nextProps.compatapps
      })
    }

    if (nextProps.compatdevs) {
      this.setState({
        CompatDevs: nextProps.compatdevs
        })
      }

    // if (this.state.switcher === true) {

    //     this.props.hostnames.length = 0

    // }

    // console.log('newpropers', nextProps)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nprops',nextProps)
  //   console.log('nstate',nextState)
  // }

  getData = (hostitems) => {
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




    // this.setState({
    //   selection: selection,
    // });


    // console.log('e', e.target)
    // console.log('shift', shift)
    // console.log('row', row)

      // if (this.state.ichecked === true) {
    //====> REDUX
      this.props.fetchComptAppz(selection);
      // }



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
    });

    // console.log('down', Appselection)

      // if (this.state.ichecked === true) {
    //====> REDUX
      this.props.fetchComptDevs(Appselection);
      // }


  };

// ---> end

// ---> Toggle All for both tables

  // toggleAll = () => {
  //   const selectAll = this.state.selectAll ? false : true;
  //   const selection = [];

  //   if (selectAll) {
  //     const wrappedInstance = this.checkboxTable.getWrappedInstance();


  //     console.log('wrap1',wrappedInstance)



  //     const currentRecords = wrappedInstance.getResolvedState().sortedData;

  //     currentRecords.forEach(item => {
  //       selection.push(item._original.deviceId);
  //     });
  //   }

  //   this.setState({ selectAll, selection });
  // };

  // ---> second one

  toggleAllApps = () => {
    const selectAllApps = this.state.selectAllApps ? false : true;
    const Appselection = [];

    if (selectAllApps) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();

      const currentRecords = wrappedInstance.getResolvedState().sortedData;

      currentRecords.forEach(item => {
        Appselection.push(item._original.versionId);
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
        return selectedAppIds.includes(appz.versionId);
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
  //             CompatApps: yo
  //           });
  //               // console.log('yo', this.state.CompatApps)
  //         })
  //
  //       .catch( function(error){
  //         console.log(error);
  //       });
  //
  // }

  onSwitcher = (e) => {


    // this.setState({
    //   ichecked: e.target.checked
    // })

    this.setState(prevState => ({
      ichecked: !prevState.ichecked
    }));


    // if (this.state.ichecked === true) {

    // }



    // this.setState({
    //   ichecked: !this.state.ichecked
    // })

    // if (this.state.checked === true) {
    //   this.setState({
    //     selection: []
    //   })
    // }

    // console.log('parent', this.state.ichecked)
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
    this.logSelection();
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }



  render() {
    // this.props.fetchComptAppz(this.state.test); INFINITE LOOP


    // class Gerald extends Component {

    //   unCheck = () => {
    //     let ref = 'ref_';
    //     this.refs[ref].checked = !this.refs[ref].checked;
    //     // console.log('uncheek', e.target)
    //   }

    //   render () {
    //     return (
    //     <Checkbox
    //       // type={props.selectType || 'checkbox'}
    //       // inputStyle={styles.yolookInput}
    //       style={{textAlign: 'left'}}
    //       checked={this.props.checked}
    //       ref={'ref_'}
    //       onClick={(e) => {

    //         const { shiftKey } = e;

    //         e.stopPropagation();

    //         this.props.onClick(this.props.id, shiftKey, this.props.row);

    //         // console.log(props.checked)

    //       }}

    //     />
    //     );
    //   }
    // }


    // const MyCheckbox = (props) => {

    //   return (
    //     // <input
    //     //   type={props.selectType || 'checkbox'}

    //     //   // checked={props.checked}

    //     //   checked={props.checked}

    //     //   onClick={(e) => {

    //     //     const { shiftKey } = e;

    //     //     e.stopPropagation();

    //     //     props.onClick(props.id, shiftKey, props.row);

    //     //     // console.log(props.checked)

    //     //   }}
    //     //   onChange={(e,i) => {this.onChange(e,props.checked)}}
    //     // />

    //     <Checkbox
    //       // type={props.selectType || 'checkbox'}
    //       // inputStyle={styles.yolookInput}
    //       style={{textAlign: 'left'}}
    //       checked={props.checked}
    //       // ref={'ref_'}
    //       onClick={(e) => {

    //         const { shiftKey } = e;

    //         e.stopPropagation();

    //         props.onClick(props.id, shiftKey, props.row);

    //         // console.log(props.checked)

    //       }}

    //     />



    //   )
    // }






    //===>FROM REDUX
    const hostitems = this.props.hostnames
    const appz = this.props.appz

    // console.log ('appzzz', appz)

    //===>ACTUAL DATA
    const data = this.getData(hostitems);
    const Appdata = this.getData(appz);
    // console.log('Appdata', Appdata)

    //===>TABLE COLUMNS
    const columns = this.getColumns(data,"deviceId");
    const Appcolumns = this.getColumns(Appdata,"versionId")
    // console.log('Appcolumns', Appcolumns)

    //===>SEPARATOR
    const { toggleSelection, toggleAppSelection,
            // toggleAll,
            toggleAllApps,
            isSelected, isAppSelected } = this;

    const { selectAll, selectAllApps } = this.state;

    //===>DEVICEBOXER PROPS
    const checkboxProps = {
      toggleSelection,
      // toggleAll,
      selectAll,
      isSelected,
      // logSelection,
      SelectInputComponent: Gerald,
      selectType: "checkbox",
    };

    //===>APPBOXER PROPS
    const AppCheckboxProps = {
      toggleAppSelection,
      toggleAllApps,
      selectAllApps,
      isAppSelected,
      // logSelection,
      selectType: "checkbox"
    };

    // console.log('state', this.state.test)
    // const test = this.state.test
    //
    const CompatApps = this.state.CompatApps

    const CompatDevs = this.state.CompatDevs

    // const pselection = this.state.selection

    // console.log('CompatApps', this.state.CompatApps)
    //
    // console.log('test', this.state.test)
    console.log('propers', this.props)
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
                <span style={styles.span}>Applications</span>
                <Toggle
                  onToggle={(e) => this.onSwitcher(e)}
                  label="CFES"
                  labelPosition="right"
                  // toggled={this.state.ichecked}
                  labelStyle={styles.label}
                />
                {/* <ToolbarTitle text="Filter by CFE" /> */}
                {/* <ToolbarSeparator /> */}
              </ToolbarGroup>

            </Toolbar>
          </div>

        </div>


        <div className="row">
          <div className="col-xs-6">
        {
          this.props.hostnames.length > 0
          ?
            <DeviceBoxer
              // ref={r => (this.checkboxTable = r)}
              // ref={r => (this.checkboxTable = r)}
              data={hostitems}
              columns={columns}
              // ref={r => (this.checkboxTable = r)}
              switcher={this.state.ichecked}
              {...checkboxProps}
              CompatDevs={CompatDevs}
              // selection={this.state.selection}
            />
          :<div></div>
        }
<br/>
        <button
          onClick={() => this.unCheck()}
        >

          Toggleb

        </button>

          </div>

          <div className="col-xs-6">
        {
          this.props.appz.length > 0
          ?
            <AppBoxer
              Appdata={appz}
              Appcolumns={Appcolumns}

              switcher={this.state.ichecked}
              {...AppCheckboxProps}
              CompatApps={CompatApps}
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
  compatapps: state.hostnames.selectionApps,
  compatdevs: state.hostnames.selectionDevs
});

export default connect(mapStatetoProps, {
  fetchHosts,
  fetchAppz,
  fetchComptAppz,
  fetchComptDevs
})(ContentViewer);
