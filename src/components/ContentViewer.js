import React, { Component } from 'react';
import DeviceBoxer from "./DeviceBoxer";
import AppBoxer from './AppBoxer'
import Kard from "./Kard";
import ProgressMeter from './ProgressMeter';
// import _ from 'lodash';

import { connect } from 'react-redux';
import { fetchHosts } from '../actions/hostnameActions';
import { fetchAppz } from "../actions/hostnameActions";

const styles = {
  center: {
    margin: 20,
    padding: 20
  }
};

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
      appz: []

    }
  }


  onFilteredChange(column, value) {
    this.filtering = true;
  }

  componentWillMount() {

    this.props.fetchHosts();
    this.props.fetchAppz();
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
        // this.setState({loading:false})
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
      // row: row
    });
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

  handleChildFunc = (arr, evt) => {
    console.log('here', arr)
  }


  render() {
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

    // console.log('after', this.state.cfes);

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
  appz: state.hostnames.itemz
});

export default connect(mapStatetoProps, { fetchHosts, fetchAppz })(ContentViewer);
