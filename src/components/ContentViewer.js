import React, { Component } from 'react';
import BoxerNew from "./BoxerNew";
import AppBoxer from "./AppBoxer";
import Kard from "./Kard";
import ProgressMeter from './ProgressMeter';

import { connect } from 'react-redux';
import { fetchHosts } from '../actions/hostnameActions';


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
      cfes: [],
      selection: [],
      // row: [],
      selectAll: false
    }
  }

  componentWillMount() {
    this.props.fetchHosts();
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
        if (key !== "deviceId") {
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
      // row: row
    });
  };

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

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  logSelection = (selectedDeviceIds) => {
    selectedDeviceIds = this.state.selection;

    // const selectedIndexes = selectedDeviceIds.map(x => this.props.hostnames[x-1])
    const { hostnames } = this.props;

    const selectedDevices = hostnames
      .filter(hostname => {
        return selectedDeviceIds.includes(hostname.deviceId);
      })
      .map(device => device.deviceName);

      // this.props.cfecallback(selectedDevices)
      this.setState({ cfes: selectedDevices})

    console.log(selectedDevices);
  };


  // cfeCallback (selectedDevices) {
  //   this.setState({
  //     cfes:selectedDevices
  //   })
  // }
  //

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
    const hostitems = this.props.hostnames;
    // console.log (hostitems)
    const data = this.getData(hostitems);
    // console.log(data)
    const columns = this.getColumns(data);
    // console.log(columns)
    // This is for the first table
    const { toggleSelection, toggleAll, isSelected } = this;

    const { selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
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
            <BoxerNew
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

            <AppBoxer />

          </div>
        </div>
        {/* {
          this.state.cfes > 0
          ? */}
          <ProgressMeter
            title={this.props.title}
            modal={this.props.modal}
            open={this.state.open}
            handleClose={this.handleClose}
            passedcfes={this.state.cfes}
          />

      </div>
    );
  }
}

const mapStatetoProps = state => ({
  hostnames: state.hostnames.items
});

export default connect(mapStatetoProps, { fetchHosts })(ContentViewer);
