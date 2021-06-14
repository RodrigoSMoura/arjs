// AFRAME.registerComponent('clickhandler', {
//     init: function(e) {
//         this.el.sceneEl.addEventListener('click', (e) => {
//             console.log(e.target.getAttribute('ar-name') + ' Clicked!')
//         });
// }});
const AFRAME = window.AFRAME;

export function RegisterPeakFinder(){
        console.log("entrou 1");
        AFRAME.registerComponent('peakfinder', {
    init: function() {
        this.loaded = false;
        console.log("entrou 2");
        window.addEventListener('gps-camera-update-position', e => {
        if(this.loaded === false) {
               if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(this._loadPeaks);
                this.loaded = true;
                }
            }
        });
    },
    _loadPeaks: function(position) {

        const scale = 10;

        // Consulta dados pela posição
        var dados = [
            {
                Latitude: -11.011415,
                Longitude: -37.091547,
                ImageUrl: "https://192.168.15.3:3000/images/LOGO-ILHA.png",
                OpenUrl:"https://www.instagram.com/ilhaenterprise/",
                Nome: "Ilha"
            },
            {
                Latitude: -11.011650,
                Longitude: -37.091887,
                ImageUrl: "https://192.168.15.3:3000/images/google.png",
                OpenUrl:"www.google.com.br",
                Nome: "Google"
            }
        ];          

        var aScene = document.querySelector('a-scene');

        dados.forEach(dado => {
            let entity = document.createElement("a-entity");
            entity.setAttribute('peakfinder');
            entity.setAttribute('look-at', '[gps-camera]');
            entity.setAttribute('scale', {
                x: scale,
                y: scale,
                z: scale
            });
            entity.setAttribute('gps-entity-place', {
                latitude: dado.Latitude,
                longitude: dado.Longitude
            });
            entity.setAttribute('emitevents', 'true');
            
            entity.setAttribute('cursor', 'rayOrigin: mouse');
            entity.setAttribute('ar-name',  dado.Nome);

            let imagem = document.createElement('a-image');
            imagem.setAttribute('width', '1');
            imagem.setAttribute('height', '1');
            // entity.setAttribute('raycaster', 'objects: [clickhandler]');
            entity.setAttribute('clickhandler', '');
            // raycaster="objects: [clickhandler];"
            
            imagem.setAttribute('src', dado.ImageUrl);
            entity.appendChild(imagem);
             
            // imagem.setAttribute('id', imagemNome);
            // imagem.setAttribute('crossorigin', 'anonymous');
            // imagem.setAttribute('src', dados.ImageUrl);
           
            aScene.appendChild(entity);
        });

        /*
          var latitude = -11.011415; //position.coords.latitude + 0.0002;//-11.011074;
          var longitude = -37.091547; //position.coords.longitude + 0.0002;// -37.091301;
          console.log('latitude Original:' + position.coords.latitude);
          console.log('longitude Original:' + position.coords.longitude);

          console.log('latitude:' + latitude);
          console.log('longitude:' + longitude);
          const scale = 10;
          var entity = document.querySelector("a-entity");
          // const entity = document.createElement('a-entity');
          entity.setAttribute('look-at', '[gps-camera]');
          // entity.setAttribute('value', 'Encontrou?');
          entity.setAttribute('scale', {
              x: scale,
              y: scale,
              z: scale
          });
          entity.setAttribute('gps-entity-place', {
              latitude: latitude,
              longitude: longitude
          });
        */
      }
});
}