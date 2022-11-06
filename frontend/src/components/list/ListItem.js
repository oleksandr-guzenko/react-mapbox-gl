import React from 'react'
import Flag from "react-world-flags";
import GeoJSONArea from "@mapbox/geojson-area";

function ListItem(props) {
    const item = props.item;
    const coordinates = item.geoData.features[0].geometry.coordinates;
    let points = [];
    let max =  -1000000;
    let min = 1000000;
    let delta = 0;
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

    delta = Math.abs(min);

    for(let i = 0; i < points.length; i ++) {
        points[i] = (points[i] + delta) * 50 / (max + delta);
    }
    
    const areaInSquaredMeters = (GeoJSONArea.geometry(item.geoData.features[0].geometry) * 0.000247105).toFixed(2);

    return (
        <div className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}}>
            <div className="d-flex">
                <div className='mr-2'>
                    <svg height="50" width="50">
                        <polygon 
                            points={points.toString()}
                            style={{
                                fill:'#aaa', 
                                stroke: '#aaa',
                                strokeWidth:1}} 
                        />
                    </svg>
                </div>
                <div>
                    <div className='d-flex'>
                        <span>{ icons[item.type] }</span>
                        <img src="assets/flags/ac.svg" alt="" className='d-inline' width="30px"/>
                        {/* <Flag code={item.countryCode} height="16" /> */}
                        <b> {item.name}</b>
                    </div>
                    <div>{areaInSquaredMeters} ac</div>
                </div>
            </div>
        </div>
    )
}

export default ListItem