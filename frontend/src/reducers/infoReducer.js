import { 
    GET_ALL_INFO,
    GET_RESULTS,
    GET_CURRENT
 } from "../actions/types";

const initialState = {
    all: [],
    current: {},
    results: [],
    loading: true,
    resultLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_INFO:
    return { 
        ...state, 
        all: action.payload,
        loading: false 
    }
  
  case GET_RESULTS:
    return { 
        ...state, 
        results: action.payload 
    }

  case GET_CURRENT:
    return { 
        ...state, 
        current: action.payload 
    }

  default:
    return state
  }
}
