import React, { useEffect } from 'react';
import { Scene, Entity, Image, Camera } from 'react-aframe-ar';
import { PointService } from './services/PointService'

const service = PointService();

function EntityLocalization({ peakFinderKey, scale, latitude, longitude, imgSrc }) {

  useEffect(() => {
    var registerComponent = window.AFRAME.registerComponent(`peakfinder='${peakFinderKey}'`, {
      init: function () {
        this.el.addEventListener("mouseup", (e) => {
          e.preventDefault();
          console.log(`HELLO`)
          // window.open("https://google.com.br", "_blank");
        })
      },

      remove: function(){
        // this.el.removeEventListener("mouseup");
        console.log("removido");
      }
    })

    return () => {
      // registerComponent.prototype.remove();
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
  // var entitiesList = React.useRef([]);
  const entitiesList = React.useRef([]);
  const [entitites, setEntities] = React.useState([]);
  const [scale, setScale] = React.useState(5);
  const [forceUpdate, setForceUpdate] = React.useState([]);

  useEffect(() => {
    setScale(5);
    // const i_id = setInterval(()=> { 
      // service.GetPoints().then((points) => {
      //   console.log("Points: ")
      //   console.log(points)
      //    //  var points = [{
      //    //    id: 2,
      //    //    imageUrl: "https://raw.githubusercontent.com/RodrigoSMoura/ARjsTests/main/docs/LOGO-ILHA.png",
      //    //    latitude: "-11.0111058",
      //    //    linkUrl: "https://www.instagram.com/ilhaenterprise/",
      //    //    longitude: "-37.0909365",
      //    //    name: "Ilha 2",
      //    //  }]
          
      //    //  console.log("Dados: ")
      //    //  console.log(dados)
      //     if (points) {
      //        var actualPoints = JSON.parse(window.localStorage.getItem('points'));
      //        if (!actualPoints) actualPoints = [];
      //          actualPoints = [...actualPoints, ...points.filter(p => !actualPoints.length || actualPoints.find(r => r.id !== p.id))];
      //        window.localStorage.setItem('points', JSON.stringify(actualPoints));

      //       //  if (points.filter(p => !actualPoints.length || actualPoints.find(r => r.id !== p.id)).length)
      //       // entitiesList.current = actualPoints;
      //       // setForceUpdate(forceUpdate => forceUpdate = actualPoints) 
      //     }
      // });
    // const i_id = setInterval(()=> { 
      Chama();
    // }, 5000);

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

  // useEffect(()=> {

  function Chama(){
    var points = JSON.parse(window.localStorage.getItem('points'));
    try{
    if (points && points.length){   
      var novosPoints = points.filter(p => entitites.find(e => e.key !== p.id) === undefined);
    if (novosPoints.length){
        setEntities([
              ...entitites,
              ...novosPoints.map((p) => 
            <EntityLocalization key={p.id} peakFinderKey={`peakfinder-${p.id}`} scale={scale} latitude={p.latitude} longitude={p.longitude} imgSrc={p.imageUrl}></EntityLocalization>
            )
          ]);
        }
      }
    }catch(err){console.log(err)}    
  }
  // },[forceUpdate])

  // useEffect(()=>{
  //   if (entitiesList.length)
    
  // },[entitiesList])

  return (
    <Scene
      vr-mode-ui="enabled: false"
      raycaster={`objects: [${`peakfinder-1`}]`}
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      {entitites}
      <Entity camera gps-camera rotation-reader look-controls-enabled='true' arjs-look-controls='smoothingFactor: 1' gps-camera='gpsMinDistance: 5'>
        <Entity cursor="fuse: false"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.01"> </Entity> </Entity>
    </Scene>
  );
}

export default ArApp;
