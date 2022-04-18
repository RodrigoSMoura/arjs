import React, { useEffect, useState } from 'react';
import { PointService } from './services/PointService'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import crosshairIcon from './icon/crosshair.svg'
import ImageUpload from './ImageUpload'
// import ReactLeafletSearch from "react-leaflet-search";
// import "./leaflet.css";

const service = PointService();
var positionn = "";

function LocationMarker({positionCallback: callBackPosition, localize, lat, lng}) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        // map.locate()
        setPosition(e.latlng)
        callBackPosition(e.latlng);
        // console.log(e);
      },
      locationfound(e) {
        callBackPosition(e.latlng);
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
      goToLocation(e){
          console.log("Irei!")
      }
    })

    useEffect(() => {
        if (localize){
            map.locate();
        }
        if (lat && lng){
            setPosition([lat,lng])
            map.setView([lat,lng], map.getZoom())
        }
    }, [])
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Este será o seu ponto.</Popup>
      </Marker>
    )
  }

function ManagePoints(){

    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");

    const [resultadosLocalizacao, setLocalizacoes] = useState([]);

    const [points, setPoints] = useState([]);

    const [locationMarkers, setLocationMarkers] = useState([]);

    const [localize, setLocalize] = useState(null);

    const [typeImage, setTypeImage] = useState("upload");

    useEffect(()=>{
        UpdatePointsList();
        
        setLocationMarkers([
            <LocationMarker key={"first-location" + new Date().getMilliseconds()} positionCallback={(e) => handleChangePosition(e)} localize={false} />
        ]);

    },[])    
    
    function UpdatePointsList(){
        service.GetPoints().then((result) => {
            
            setPoints(result)
        }).catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        if (typeImage === "upload"){
            ImageUpload(imageFile, 
                data => {
                    console.log(data.url)
                    let imageUrl = data.url;
                    InserirPonto({
                        id: 1,
                        name,
                        imageUrl,
                        latitude,
                        longitude
                    });
                    setLoading(false);                    
            },
            err => console.log(err));
        }else
        {
            InserirPonto({
                id: 1,
                name,
                imageUrl,
                latitude,
                longitude
            });
            setLoading(false);
        }
    }

    function InserirPonto(point){        
        console.log(JSON.stringify(point));
        service.InsertPoint(point);
    }

    function handleChangePosition(e){
        setLatitude(e.lat);
        setLongitude(e.lng);
    }

    function Pesquisar(){        
            fetch(`https://nominatim.openstreetmap.org/search?street=${number},${street}&city=${city}&format=jsonv2`).then((e) => 
            {
                e.json().then(j => 
                    {
                        console.log("Encontrou locais:");
                        console.log(j);
                        setLocalizacoes(j);
                        if (j.length == 1){
                            setLocationMarkers([
                                <LocationMarker key={"lm" + j[0].place_id} positionCallback={(e) => handleChangePosition(e)} lat={j[0].lat} lng={j[0].lon} />
                            ]);
                            setLatitude(j[0].lat);
                            setLongitude(j[0].lon);
                        }
                    })
            }).catch((e) => console.log(e));
    }

    function ResultadoLocalizacoes(){
        return <div className="col-12 mb-3">
        <h5><strong>Localizações encontradas:</strong></h5>
        <p  className="card-subtitle mb-2 text-muted">
            Foram encontradas os seguintes locais. Selecione um.<br/> 
        </p >
        <div className="list-group">                                                                      
            {resultadosLocalizacao.map((item) => {
                return <button type="button" className="list-group-item list-group-item-action" key={item.place_id} onClick={() => {AddLocationMarker(item.place_id, item.lat, item.lon); handleChangePosition({lat: item.lat, lng: item.lon})}}>
                    {item.display_name}
                </button>
            })}                                
        </div>
    </div>    
    }

    useEffect(()=>{
        console.log("localize, clicou")
        if (localize !== null){
            setLocationMarkers([
                <LocationMarker key={"self-localization-" + new Date().getMilliseconds()} positionCallback={(e) => handleChangePosition(e)} localize={true} />
            ]);
        }
    }, [localize])

    function AddLocationMarker(id, lat, lon){
        setLocationMarkers([
            <LocationMarker key={"lm" + id} positionCallback={(e) => handleChangePosition(e)} lat={lat} lng={lon} />
        ]);
    }

    function onChangeFile(e) {
        const files = Array.from(e.target.files)
        console.log("files");
        console.log(e.target.files[0]);
        setImageFile(files[0]);        
      }
    

    return (
        <div className="container-lg">
            <br/>
            <h1>Inclusão de Pontos de Localização </h1>
            <br/>

            <form onSubmit={handleSubmit} className="row justify-content-md-center">

                <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="description" className="form-label">Nome</label>
                    <input type="text" id="description" className="form-control" placeholder="Nome do ponto de localização" onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className="col-6 mb-3">
                    <label className="form-label">Imagem</label>
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className={`nav-link ${typeImage === 'upload' ? "active" : ""}`} role="tab" aria-current="true" href="#" onClick={(e) => { e.preventDefault(); setTypeImage('upload') }}>Upload</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${typeImage === 'url' ? "active" : ""}`} role="tab" href="#" onClick={(e) => { e.preventDefault(); setTypeImage('url') }}>Url</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {typeImage === 'upload' ? 
                                <div role="tabpanel" id="imageUpload">
                                    <input type='file' className="form-control" id='singleFile' onChange={onChangeFile} />
                                </div> :
                                <div role="tabpanel" id="imageUrl">
                                    <input type="text" id="imageUrl"  className="form-control" placeholder="Insira a url da imagem do ponto" onChange={(e) => setImageUrl(e.target.value)}></input>
                                </div>
                            }
                        </div>
                       
                    </div>
                </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <h4 className="card-title">
                                    Pontos de localização
                                </h4>
                                <p  className="card-subtitle mb-2 text-muted">
                                    Realize a busca abaixo e selecione o ponto que seu anúncio deve aparecer. Você deve utilizar o mapa ao lado para facilitar sua busca.<br/> 
                                </p >
                                <br/>
                                <div className="row">
                                    <div className="col-lg-8 col-sm-4 mb-3">
                                        <input className="form-control" type="text" onChange={(e) => setStreet(e.target.value)} value={street} placeholder="Rua" />
                                    </div>
                                    <div className="col-lg-4 col-sm-2 mb-3">
                                        <input className="form-control" type="text" onChange={(e) => setNumber(e.target.value)} value={number} placeholder="Número" />
                                    </div>
                                    <div className="col-lg-6 col-sm-6 mb-3">
                                        <input className="form-control" type="text" onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} placeholder="Bairro" />
                                    </div>
                                    <div className="col-lg-6 col-sm-3 mb-3">
                                        <input className="form-control" type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="Cidade" />
                                    </div>
                                    <div className="col-lg-4 col-sm-1 mb-3">
                                        <button type="button" className="btn btn-primary mx-auto" onClick={Pesquisar}>Pesquisar</button>
                                    </div>           
                                    <div className="col-lg-12 col-sm-1 mb-3">
                                        {resultadosLocalizacao.length > 1 && <ResultadoLocalizacoes/> }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="col-12 mb-3 position-relative">
                                        <button type="button" className="btn btn-sm btn-light border border-dark m-2 position-absolute top-0 end-0" style={{"zIndex":"999999"}} onClick={() => setLocalize(!localize)}><img src={crosshairIcon}></img></button>
                                        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            {locationMarkers}
                                        </MapContainer>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h6 className="card-title">
                                Latitude e Longitude
                            </h6>
                            <p  className="card-subtitle mb-2 text-muted">
                                Abaixo está a latitude e longitude do ponto.<br/> 
                            </p>
                            <div className="row">
                            <div className="col-lg-3 col-6 mb-3">
                                <label htmlFor="latitude" className="form-label">Latitude</label>
                                <input type="text" id="latitude"  className="form-control" placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)} value={latitude}></input>
                            </div>

                            <div className="col-lg-3 col-6 mb-3">
                                <label htmlFor="longitude" className="form-label">Longitude</label>
                                <input type="text" id="longitude"  className="form-control" placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)} value={longitude}></input>
                            </div>    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    
                { isLoading ? <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button> : <button type="submit" className="btn btn-primary">Salvar</button> }
                    
                </div>
            </form>
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Id
                        </th>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Latitude
                        </th>
                        <th scope="col">
                            Longitude
                        </th>
                        <th scope="col">
                            ImageUrl
                        </th>
                        <th scole="col">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {points.map(p => 
                        <tr key={p.id}>
                            <td>{p.id}</td> 
                            <td>{p.name}</td> 
                            <td>{p.latitude}</td> 
                            <td>{p.longitude}</td> 
                            <td><img src={p.imageUrl} width="50px" className="img-fluid" /></td> 
                            <td><button type="button" className="btn btn-danger" onClick={() => {service.RemovePoint(p.id); UpdatePointsList()}} >Remover</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            <div>
                <button type="button" className="btn btn-primary" onClick={UpdatePointsList} >Refresh</button>
            </div>
        </div>
    );
}

export default ManagePoints;

/*

imageUrl: "https://raw.githubusercontent.com/RodrigoSMoura/ARjsTests/main/docs/LOGO-ILHA.png",
latitude: "-11.0111058",
linkUrl: "https://www.instagram.com/ilhaenterprise/",
longitude: "-37.0909365",
name: "Ilha 2",

*/