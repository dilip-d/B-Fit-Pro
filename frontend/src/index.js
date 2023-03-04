import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import { PersistGate } from 'redux-persist/integration/react';
// import persistStore from 'redux-persist/es/persistStore';
import App from "./App";
import { Provider } from "react-redux";
import { store } from './redux/store';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        {/* <PersistGate loading={null} persistor={persistStore(store)} /> */}
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
