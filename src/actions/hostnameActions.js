import { FETCH_HOSTNAMES, FETCH_APPZ } from './Types';
import hostnames from '../device_data';
import appz from '../apps_data';

export const fetchHosts = () => dispatch => {
  dispatch({
    type: FETCH_HOSTNAMES,
    payload: hostnames
  })
};

export const fetchAppz = () => dispatch => {
  dispatch({
    type: FETCH_APPZ,
    payload: appz
  })
}
