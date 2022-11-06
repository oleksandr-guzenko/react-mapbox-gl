import { 
    GET_ALL_INFO
 } from "../actions/types";

const initialState = {
    info: [],
    current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_INFO:
    return { 
        ...state, 
        current: action.payload 
    }

  default:
    return state
  }
}
