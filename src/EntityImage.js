import React from 'react'

function EntityImage(){

    // let entity = document.createElement("a-entity");
    // entity.setAttribute('peakfinder');
    // entity.setAttribute('look-at', '[gps-camera]');
    // entity.setAttribute('scale', {
    //     x: scale,
    //     y: scale,
    //     z: scale
    // });
    // entity.setAttribute('gps-entity-place', {
    //     latitude: dado.Latitude,
    //     longitude: dado.Longitude
    // });
    // entity.setAttribute('emitevents', 'true');
    
    // entity.setAttribute('cursor', 'rayOrigin: mouse');
    // entity.setAttribute('ar-name',  dado.Nome);

    // let imagem = document.createElement('a-image');
    // imagem.setAttribute('width', '1');
    // imagem.setAttribute('height', '1');
    // // entity.setAttribute('raycaster', 'objects: [clickhandler]');
    // entity.setAttribute('clickhandler', '');
    // // raycaster="objects: [clickhandler];"
    
    // imagem.setAttribute('src', dado.ImageUrl);
    // entity.appendChild(imagem);
     
    // // imagem.setAttribute('id', imagemNome);
    // // imagem.setAttribute('crossorigin', 'anonymous');
    // // imagem.setAttribute('src', dados.ImageUrl);
   
    // aScene.appendChild(entity);

    return(
        <a-entity peakfinder look-at="[gps-camera]" scale="{x:scale, y:scale, z:scale}" gps-entity-place="{latitude: x, longitude:y}"  >
            <a-image width="1" height="1" scr="{}" />
        </a-entity>
    )
}


export default EntityImage;