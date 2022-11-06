import { 
    GET_ALL_INFO
 } from "./types";

import axios from "axios";

export const getAllInfo = () => dispatch => {
    axios
        .get('http://localhost:8000/fields?all&succeed')
        .then(res => {
            dispatch({
                type: GET_ALL_INFO,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
