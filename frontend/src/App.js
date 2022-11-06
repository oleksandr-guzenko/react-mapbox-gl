import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';
import { Provider, useSelector } from "react-redux";

import { getAllInfo } from './actions/infoActions'
import ControlPanel from './ControlPanel';
import Search from "./components/search/Search";
import List from "./components/list/List";
import store from "./store";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZHJhZ29ud2Fycmlvcjk4NzYiLCJhIjoiY2xhNGN0azJsMGV6djNucHFuam11YjhscyJ9.Mwfjp_OWTROc2TBO70_cRQ'; // Set your mapbox token here

export default function App() {
  const [mapStyle, setMapStyle] = useState(null);

  return (
    <Provider store={store}>
      <div className="pl-5 pr-5 pt-5">
        <div className="row">
          <div className="col-12 col-lg-4 mb-lg-0 mb-3">
            <Search />
            <List />
          </div>
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
            />
            <ControlPanel onChange={setMapStyle} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}