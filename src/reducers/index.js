import { combineReducers} from 'redux';
import hostnameReducer from './hostnameReducer';

export default combineReducers({
  hostnames:hostnameReducer
})
