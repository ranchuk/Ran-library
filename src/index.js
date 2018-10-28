import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";
//import registerServiceWorker from "./registerServiceWorker";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
