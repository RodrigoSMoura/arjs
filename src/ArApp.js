import React, { useEffect } from 'react';
import { Scene, Entity, Image } from 'react-aframe-ar';
import { PointService } from './services/PointService'

const service = PointService();

function EntityLocalization({ peakFinderKey, scale, latitude, longitude, imgSrc }) {

  useEffect(() => {
    window.AFRAME.registerComponent(`peakfinder='${peakFinderKey}'`, {
      init: function () {
        this.el.addEventListener("mouseup", (e) => {
          e.preventDefault();
          console.log(`HELLO`)
        })
      },

      remove: function(){
        console.log("removido");
      }
    })

    return () => {
      delete window.AFRAME.components[`peakfinder='${peakFinderKey}'`]
      console.log("EntityLocalization removido");
    }
  }, []);

  return (
    <Entity  peakfinder={peakFinderKey} look-at="[gps-camera]" scale={`${scale}, ${scale}, ${scale}`} gps-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}  >
      <Image width="1" height="1" src={imgSrc} crossorigin="anonymous" />
    </Entity>
  )
}

function ArApp() {
  const entitiesList = React.useRef([]);
  const [entitites, setEntities] = React.useState([]);
  const [scale, setScale] = React.useState(5);

  useEffect(() => {
    setScale(5);
      Chama();

    const i_id = service.RegisterChange(() => {
      Chama();
    });

     return () => {
       clearInterval(i_id);
       document.querySelector('video').remove();
     }
  }, [])
  
  React.useCallback(() => {
    alert(entitiesList);
  }, [entitiesList]);

  function Chama(){
    var points = JSON.parse(window.localStorage.getItem('points'));
    try{
      setEntities([
          ...points.map((p) => 
        <EntityLocalization key={p.id} peakFinderKey={`peakfinder-${p.id}`} scale={scale} latitude={p.latitude} longitude={p.longitude} imgSrc={p.imageUrl}></EntityLocalization>
        )
      ]);
    // if (points && points.length){   
    //   var novosPoints = points.filter(p => entitites.find(e => e.key !== p.id) === undefined);
    // if (novosPoints.length){
    //     setEntities([
    //           ...points.map((p) => 
    //         <EntityLocalization key={p.id} peakFinderKey={`peakfinder-${p.id}`} scale={scale} latitude={p.latitude} longitude={p.longitude} imgSrc={p.imageUrl}></EntityLocalization>
    //         )
    //       ]);
    //     }
    //   }
    }catch(err){console.log(err)}    
  }

  return (
    <Scene
      vr-mode-ui="enabled: false"
      raycaster={`objects: [${`peakfinder-1`}]`}
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      {entitites}
      <Entity camera gps-camera rotation-reader look-controls-enabled='true' arjs-look-controls='smoothingFactor: 1'>
        <Entity cursor="fuse: false"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.01"> </Entity> </Entity>
    </Scene>
  );
}

export default ArApp;
