import React, { useEffect, useState } from 'react';
import { PointService } from './services/PointService'

const service = PointService();

function ManagePoints(){

    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const [points, setPoints] = useState([]);

    useEffect(()=>{
        UpdatePointsList();
    },[])    
    
    function UpdatePointsList(){
        service.GetPoints().then((result) => {
            
            setPoints(result)
        }).catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let point = {
            id: 1,
            name,
            imageUrl,
            latitude,
            longitude
        }
        console.log(JSON.stringify(point));
        service.InsertPoint(point);
    }

    return (
        <div className="container">
            <br/>
            <h1>Inclusão de Pontos de Localização </h1>
            <br/>

            <form onSubmit={handleSubmit} className="row justify-content-md-center">

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Nome</label>
                    <input type="text" id="description" className="form-control" placeholder="Nome do ponto de localização" onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Url da imagem</label>
                    <input type="text" id="imageUrl"  className="form-control" placeholder="Insira a url da imagem do ponto" onChange={(e) => setImageUrl(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="latitude" className="form-label">Latitude</label>
                    <input type="text" id="latitude"  className="form-control" placeholder="Latitude" onChange={(e) => setLatitude(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="longitude" className="form-label">Latitude</label>
                    <input type="text" id="longitude"  className="form-control" placeholder="Longitude" onChange={(e) => setLongitude(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Salvar</button>
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
                    </tr>
                </thead>
                <tbody>
                    {points.map(p => 
                        <tr key={p.id}>
                            <td>{p.id}</td> 
                            <td>{p.name}</td> 
                            <td>{p.latitude}</td> 
                            <td>{p.longitude}</td> 
                            <td>{p.imageUrl}</td> 
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            <button type="button" className="btn btn-primary" onClick={UpdatePointsList} >Refresh</button>
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