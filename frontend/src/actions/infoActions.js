import { 
    GET_ALL_INFO,
    GET_RESULTS,
    GET_CURRENT
 } from "./types";

import axios from "axios";

export const getAllInfo = () => dispatch => {
    axios
        .get('http://localhost:8000/fields?all&succeed')
        .then(res => {
            let data = [];
            const keys = Object.keys(res.data);

            for(let i = 0; i < keys.length; i ++) {
                data.push({
                 id: keys[i],
                 ...res.data[keys[i]]
                });
            }
            
            dispatch({
                type: GET_ALL_INFO,
                payload: data
            })
        })
        .catch(err => console.log(err));
}

export const getResults = () => dispatch => {
    axios
        .get('http://localhost:8000/fields?all&succeed')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_ALL_INFO,
                payload: res.data.fields
            })
        })
        .catch(err => console.log(err));
}

export const getCurrent = () => dispatch => {
    console.log('asd');
    axios
        .get('http://localhost:8000/fields?all&succeed')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_ALL_INFO,
                payload: res.data.fields
            })
        })
        .catch(err => console.log(err));
}