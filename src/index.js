import ReactDOM from "react-dom/client";
import App from "./App";
import {  HashRouter } from "react-router-dom";
// links of packages
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery/dist/jquery.js";
import 'wowjs/dist/wow.min.js' ;
import 'animate.css/animate.min.css' ;

import 'swiper/css' ; 
//
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
