import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Map, {Source, Layer} from 'react-map-gl';
import ControlPanel from '../ControlPanel';

// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature', 
//         geometry: {
//             type: 'Polygon', 
//             coordinates: [
//                             [
//                                 [
//                                     -129.436347933385,
//                                     54.7732837504813
//                                 ],
//                                 [
//                                     -141.8914201164901,
//                                     45.53125106221043
//                                 ],
//                                 [
//                                     -135.40170726381763,
//                                     49.36480731298598
//                                 ],
//                                 [
//                                     -140.14403453727405,
//                                     55.75709117241593
//                                 ],
//                                 [
//                                     -134.00157945695298,
//                                     53.13553555813956
//                                 ],
//                                 [
//                                     -129.436347933385,
//                                     54.7732837504813
//                                 ]
//                             ]
//                         ]
//                 }
//         }
//     ]
//   };

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

    console.log(current);
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