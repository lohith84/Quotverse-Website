import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ListingContextProvider } from "./context/listing-context";

ReactDOM.render(
  <React.StrictMode>
    <ListingContextProvider>
      <App />
    </ListingContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
