import { 
    GET_ALL_INFO,
    GET_RESULTS,
    GET_CURRENT
 } from "./types";

import axios from "axios";
import GeoJSONArea from "@mapbox/geojson-area";

import store from '../store';

export const getAllInfo = () => dispatch => {
    axios
        .get('http://localhost:8000/fields?all&succeed')
        .then(res => {
            let data = [];
            const keys = Object.keys(res.data);

            for(let i = 0; i < keys.length; i ++) {
                data.push({
                 id: keys[i],
                 ...res.data[keys[i]],
                 area: GeoJSONArea.geometry(res.data[keys[i]].geoData.features[0].geometry)
                });
            }
            
            dispatch({
                type: GET_ALL_INFO,
                payload: data
            })

            dispatch({
                type: GET_RESULTS,
                payload: data
            })
        })
        .catch(err => console.log(err));
}

export const getResults = ({filter, sort}) => dispatch => {
    let data = store.getState().info.all;
    if(filter !== 'all') {
        data = data.filter(value => value.type === filter);
    }

    if(sort === 'asc') data.sort((a, b) => a.area - b.area);
    else data.sort((a, b) => b.area - a.area);
    

    dispatch({
        type: GET_RESULTS,
        payload: data
    })
}

export const search = (search) => dispatch => {
    if(search.trim().length === 0) {
        dispatch({
            type: GET_RESULTS,
            payload: store.getState().info.all
        });
    } else {
        const word = search.toLowerCase();
        const data = store.getState().info.all.filter(value => value.name.toLowerCase().indexOf(search) > -1);

        dispatch({
            type: GET_RESULTS,
            payload: data
        })
    }
}

export const getCurrent = (data) => dispatch => {
    dispatch({
        type: GET_CURRENT,
        payload: data
    })
}