import 'aframe';
import React from 'react';
import ReactDOM from 'react-dom';
import {Box, Sphere, Cylinder, Plane, Sky, Text, Scene, Entity} from 'react-aframe-ar';
// import { Camera } from 'react-aframe-ar/dist/primitives';
import {Helmet} from 'react-helmet'

class AppScene extends React.Component {

  // componentDidMount(){
  //   const script = document.createElement("script");
  //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js";
  //   // script.async = true;
  //   document.body.prepend(script);

  //   const script2 = document.createElement("script");
  //   script2.src = "https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js";
  //   // script2.async = true;
  //   document.body.prepend(script2);
  // }

  render () {
    return (
      <div>
        <Helmet>
          <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
          <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script> 
        </Helmet>
      <Scene embedded arjs="sourceType: webcam; debugUIEnabled: false">
        {/* <Box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow />
        <Sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow />
        <Cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow />
        <Plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow /> */}
        <Text value="Hello world, react-aframe-ar????!" align="center" position="0 2.3 -1.5" color="#7BC8A4" />
        
      </Scene>
      </div>
    );
  }
}
 
ReactDOM.render(<AppScene/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );