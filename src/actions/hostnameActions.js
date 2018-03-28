import { FETCH_HOSTNAMES } from './Types';
import hostnames from '../test_data';

export const fetchHosts = () => dispatch => {
  dispatch({
    type: FETCH_HOSTNAMES,
    payload: hostnames
  })
}
