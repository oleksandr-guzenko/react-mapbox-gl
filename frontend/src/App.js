import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';
import ControlPanel from './ControlPanel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZHJhZ29ud2Fycmlvcjk4NzYiLCJhIjoiY2xhNGN0azJsMGV6djNucHFuam11YjhscyJ9.Mwfjp_OWTROc2TBO70_cRQ'; // Set your mapbox token here

export default function App() {
  const [mapStyle, setMapStyle] = useState(null);

  return (
    <>
      {/* <Map
        initialViewState={{
          latitude: 37.805,
          longitude: -122.447,
          zoom: 15.5
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      />

      <ControlPanel onChange={setMapStyle} /> */}
      <div>asdasd</div>
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}