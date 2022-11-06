import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Map, {Source, Layer} from 'react-map-gl';
import ControlPanel from '../ControlPanel';

const layerStyle = {
    type: 'line',
    paint: {
      'line-color': '#4E3FC8'
    }
};

function ReactMap() {
    const [mapStyle, setMapStyle] = useState(null);
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZHJhZ29ud2Fycmlvcjk4NzYiLCJhIjoiY2xhNGN0azJsMGV6djNucHFuam11YjhscyJ9.Mwfjp_OWTROc2TBO70_cRQ'; // Set your mapbox token here
    const current = useSelector(state => state.info.current);

    return (
        <div className="col-12 col-lg-8" style={{ height: '650px'}}>
            <Map
                initialViewState={{
                latitude: 37.805,
                longitude: -122.447,
                zoom: 15.5
                }}
                mapStyle={mapStyle && mapStyle.toJS()}
                styleDiffing
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                { current.id &&
                (
                    <Source id="my-data" type="geojson" data={current.geoData}>
                        <Layer {...layerStyle} />
                    </Source>
                )}
            </Map>
            <ControlPanel onChange={setMapStyle} />
        </div>
    )
}

export default ReactMap