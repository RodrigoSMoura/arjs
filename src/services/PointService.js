import firebase from "firebase/app"
import "firebase/database"
import uuid from 'react-uuid'

// Todo: Inserir dados Firebase (ou alterar serviço para utilização de outra base de dados)

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

function Initialize(){
    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
}

function PointService(){
    const db = firebase.database();    
    const ref = db.ref("points");
    var cancellationToken = false;

    async function GetPoints(){
        var result = [];
        await ref.get().then((r) => {
            r.forEach((child)=>{
                var point = child.val();
                point.id = child.key;
                result.push(point);
            })
        }).catch((err)=> {
            result = [{
              id: 2,
              imageUrl: "",
              latitude: "-11.0111058",
              linkUrl: "https://www.instagram.com/ilhaenterprise/",
              longitude: "-37.0909365",
              name: "Ilha 2",
            }]
        });

        return result;
    }

    function Result(result){
        console.log(result.val());
    }

    function RegisterChange(callbackFunction){
    const i_id = setInterval(()=> { 
    if (cancellationToken) {
        return;
    }
        GetPoints().then((result => {
            console.log(result);
            if (result) {
                // var actualPoints = JSON.parse(window.localStorage.getItem('points'));
                // if (!actualPoints) actualPoints = [];
                //     actualPoints = actualPoints.concat(result.filter(function(p) {return this.find(e => e.id === p.id) === undefined}, actualPoints));

                window.localStorage.setItem('points', JSON.stringify(result));

                console.log("vou chamar")
                callbackFunction(result);
                console.log("chamei")
            }
        }));
      }, 10000);

      return i_id;
    }

    function InsertPoint(point){
        point.id = uuid();
        var newPoint = ref.push();
        newPoint.set(point);
        console.log(newPoint.toString())
    }

    function RemovePoint(pointId){
        ref.child(pointId).remove().then(() => {
            console.log("removido");
        }).catch((e) => console.log(e));
    }

    function CancelToken(i_id){
        cancellationToken = true;
        if (i_id) clearInterval(i_id);
    }
    
    return {
        GetPoints, RegisterChange, InsertPoint, RemovePoint,
        CancelToken
    }
}

Initialize();

export { firebase, PointService }