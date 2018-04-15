import {  FETCH_HOSTNAMES,
          // FETCH_HOSTNAMES_BEGIN,
          FETCH_APPZ,
          FETCH_COMPT_APPZ,
          FETCH_COMPT_HOSTS
        } from './Types';

// import hostnames from '../device_data';
// import appz from '../apps_data';

// export const fetchHostsBegin = () => ({
//   type: FETCH_HOSTNAMES_BEGIN
// })

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

export const fetchComptAppz = (deviceId) => dispatch => {
  const URL = "https://johnsaidlongernameisbetter.azurewebsites.net/get_compat_apps/?list=[" + deviceId + "]";
  fetch( URL)
    .then(res => res.json())
      .then(compatApps =>
        dispatch({
            type: FETCH_COMPT_APPZ,
            payload: compatApps
        })
      );
};

export const fetchComptDevs = (versionId) => dispatch => {
  const URL = "https://johnsaidlongernameisbetter.azurewebsites.net/get_compat_devices/?list=[" + versionId + "]";
  fetch( URL)
    .then (res => res.json())
      .then (compatDevs => {
        dispatch({
          type: FETCH_COMPT_HOSTS,
          payload: compatDevs
        })
      });
}
