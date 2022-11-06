import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';

import { Provider, useSelector } from "react-redux";
import "flag-icons/css/flag-icons.min.css";

import { getAllInfo } from './actions/infoActions'

import Sidebar from "./components/Sidebar";
import ReactMap from "./components/ReactMap";
import store from "./store";

export default function App() {
  

  return (
    <Provider store={store}>
      <div className="pl-5 pr-5 pt-5">
        <div className="row">
          <div className="col-12 col-lg-4 mb-lg-0 mb-3">
            <Sidebar />
          </div>
          <ReactMap />
        </div>
      </div>
    </Provider>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}