import { FETCH_HOSTNAMES,
         FETCH_APPZ,
         FETCH_COMPT_APPZ,
         FETCH_COMPT_HOSTS
        } from "../actions/Types";

const initialState = {
  items: [],
  itemz: [],
  selectionApps: [],
  selectionDevs: []
};

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
      };
    case FETCH_COMPT_APPZ:
      return {
        ...state,
        selectionApps: action.payload
      };
    case FETCH_COMPT_HOSTS:
      return {
      ...state,
      selectionDevs: action.payload
    }
    default:
      return state;
  }
}
