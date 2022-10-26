import React ,{useEffect} from "react";

import WOW from 'wowjs';

export default function About() {
  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, []);
  return (
    <>
      <div id="home" className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="animate__backInLeft wow" data-wow-duration="2s">
            This site has been Developed by <br />
            <span className="text-decoration-underline">Kareem Nasser</span> <br />
            GITHUB : <a href="https://github.com/kareem-n"  target={'_blank'} rel="noreferre">click me</a>
          </h1>
        </div>
      </div>
    </>
  );
}
