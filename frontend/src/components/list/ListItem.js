import React from 'react'
import Flag from "react-world-flags";
import GeoJSONArea from "@mapbox/geojson-area";
import { useSelector, useDispatch } from 'react-redux';

import { getCurrent } from "../../actions/infoActions";
import { ScaleControl } from 'react-map-gl';

function ListItem(props) {
    const item = props.item;
    const area = props.area;
    const coordinates = item.geoData.features[0].geometry.coordinates;
    const dispatch = useDispatch();
    let points = [];
    let delta = 0;
    let country = '';
    let areaInSquaredMeters = item.area;
    let min_x = 100000;
    let min_y = 100000;
    let max_x = -100000;
    let max_y = -100000;

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
    
    for(let i = 0; i < points.length; i += 2) {
        if(points[i] < min_x) min_x = points[i];
        if(points[i + 1] < min_y) min_y = points[i + 1];
    }

    for(let i = 0; i < points.length; i += 2) {
        points[i] -= min_x;
        points[i + 1] -= min_y;
    }

    for(let i = 0; i < points.length; i += 2) {
        if(points[i] > max_x) max_x = points[i];
        if(points[i + 1] > max_y) max_y = points[i + 1];
    }

    for(let i = 0; i < points.length; i ++) {
        if(max_x > max_y) {
            points[i] = points[i] * 80 / max_x;
        } else points[i] = points[i] * 80 / max_y;
    }

    if(area === 'Ac') areaInSquaredMeters = (areaInSquaredMeters * 0.000247105).toFixed(2);
    else areaInSquaredMeters = (areaInSquaredMeters * 0.0001).toFixed(2);

    return (
        <div className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}} onClick={e => dispatch(getCurrent(item))}>
            <div className="d-flex">
                <div className='mr-2'>
                    <svg height="80" width="80" style={{transform: 'scale(1, -1)'}}>
                        {points.toString().indexOf('NaN') === -1 && 
                        (
                            <polygon 
                                points={points.toString()}
                                style={{fill:'#aaa'}} 
                            />
                        )}
                    </svg>
                </div>
                <div>
                    <div className='d-flex' style={{ fontSize: '20px'}}>
                        <span>{ icons[item.type] }</span>
                        <span className={`fi fi-${country} ml-2 mr-2`}></span>
                        <b>{item.name}</b>
                    </div>
                    <div style={{ fontSize: '24px'}}>{areaInSquaredMeters} {area.toLowerCase()}</div>
                </div>
            </div>
        </div>
    )
}

export default ListItem