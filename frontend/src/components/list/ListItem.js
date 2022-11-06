import React from 'react'
import Flag from "react-world-flags";
import GeoJSONArea from "@mapbox/geojson-area";
import { useSelector, useDispatch } from 'react-redux';

import { getCurrent } from "../../actions/infoActions";

function ListItem(props) {
    const item = props.item;
    const area = props.area;
    const coordinates = item.geoData.features[0].geometry.coordinates;
    const dispatch = useDispatch();
    let points = [];
    let max =  -1000000;
    let min = 1000000;
    let delta = 0;
    let country = '';
    let areaInSquaredMeters = item.area;

    switch(item.countryCode) {
        case 'UK': country = 'gb'; break;
        default: country = item.countryCode.toLowerCase();
    }

    const icons = {
        corporate: '🏦',
        collective: '👥',
        individual: '👤'
    };

    for(let i = 0; i < coordinates[0].length; i ++) {
        points.push(coordinates[0][i][0]);
        points.push(coordinates[0][i][1]);
    }

    for(let i = 0; i < points.length; i ++) {
        if(points[i] > max) max = points[i];
        if(points[i] < min) min = points[i];
    }

    // if(min < 0) {
    for(let i = 0; i < points.length; i ++) {
        points[i] = (points[i] - min);
    }
    
    if(area === 'Ac') areaInSquaredMeters = (areaInSquaredMeters * 0.000247105).toFixed(2);
    else areaInSquaredMeters = (areaInSquaredMeters * 0.0001).toFixed(2);

    return (
        <div className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}} onClick={e => dispatch(getCurrent(item))}>
            <div className="d-flex">
                <div className='mr-2'>
                    <svg height="200" width="200">
                        <polygon 
                            points={points.toString()}
                            style={{fill:'#aaa'}} 
                        />
                    </svg>
                </div>
                <div>
                    <div className='d-flex'>
                        <span>{ icons[item.type] }</span>
                        <span className={`fi fi-${country} ml-2 mr-2`}></span>
                        <b>{item.name}</b>
                    </div>
                    <div>{areaInSquaredMeters} {area.toLowerCase()}</div>
                </div>
            </div>
        </div>
    )
}

export default ListItem