import { FETCH_HOSTNAMES, FETCH_APPZ } from './Types';
// import hostnames from '../device_data';
// import appz from '../apps_data';

export const fetchHosts = () => dispatch => {
  fetch("https://johnsaidlongernameisbetter.azurewebsites.net/get_devices/")
  .then(res => res.json())
  .then(hostnames =>
    dispatch({
      type: FETCH_HOSTNAMES,
      payload: hostnames
    })
  );
};

export const fetchAppz = () => dispatch => {
  fetch("https://johnsaidlongernameisbetter.azurewebsites.net/get_apps/")
  .then(res => res.json())
  .then(appz =>
    dispatch({
      type: FETCH_APPZ,
      payload: appz
    })
  );
};

