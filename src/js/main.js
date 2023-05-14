import { app } from "./firebase.js";
import { getFirestore,collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";
//esta es la funcion para actualizar una publicacion, se le envia db y el objeto
//import {updatePub} from './update.js';
//esta es la funcion para crear una publicacion, se le envia db y el objeto
//import {createPub} from './create.js';
//esta es la funcion para eliminar una publicacion, se le envia db y id del objeto
//import {deletePub} from './delete.js';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const q = query(collection(db, "Publicaciones"));

let publicaciones=[];

const pubhtml = document.querySelector('#publicaciones');

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if (doc.data().disponible==true) {
    var pub=new publicacion(doc.id,doc.data().titulo,doc.data().texto,doc.data().img,doc.data().escuela); 
    publicaciones.push(pub);
  }
});

for (let i = 0; i < publicaciones.length; i++) {
  //publicaciones[i];
  //Añadir filtro
  pubhtml.innerHTML+=
  `<div class="d-flex justify-content-center mt-5">
  <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="${publicaciones[i].img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${publicaciones[i].titulo}</h5>
      <p class="card-text">${publicaciones[i].texto}</p>
    </div>
  </div>
</div>
`;  
}


//console.log(publicaciones[0].id);