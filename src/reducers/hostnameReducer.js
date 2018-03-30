import { FETCH_HOSTNAMES, FETCH_APPZ } from '../actions/Types';

const initialState = {
  items: [],
  itemz: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_HOSTNAMES:
    return {
      ...state,
      items: action.payload
    };
    case FETCH_APPZ:
    return {
      ...state,
      itemz: action.payload
    }
    default:
      return state;
  }
}
