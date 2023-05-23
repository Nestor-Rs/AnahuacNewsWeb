import { db,auth } from "./firebase.js";
import { collection, query, where, getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";
import { deletePub } from "./delete.js";
import { onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
//esta es la funcion para actualizar una publicacion, se le envia db y el objeto
//import {updatePub} from './update.js';
//esta es la funcion para crear una publicacion, se le envia db y el objeto
//import {createPub} from './create.js';
//esta es la funcion para eliminar una publicacion, se le envia db y id del objeto
//import {deletePub} from './delete.js';

// Initialize Cloud Firestore and get a reference to the service


const q = query(collection(db, "Publicaciones"));

let publicaciones=[];
const menu = document.querySelector('#menu_ul');
const pubhtml = document.querySelector('#publicaciones');

const querySnapshot = await getDocs(q);

// Obtener la URL actual
const url = new URL(window.location.href);

// Obtener el valor de un parámetro específico
const parametro = url.searchParams.get('filtro');


querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if (doc.data().disponible==true && parametro==null) {
    var pub=new publicacion(doc.id,doc.data().titulo,doc.data().texto,doc.data().img,doc.data().escuela); 
    publicaciones.push(pub);
  }
  else if(doc.data().disponible==true && parametro==doc.data().escuela){
    var pub=new publicacion(doc.id,doc.data().titulo,doc.data().texto,doc.data().img,doc.data().escuela); 
    publicaciones.push(pub);
  }
});

function pubAdmin() {
  for (let i = 0; i < publicaciones.length; i++) {
    //publicaciones[i];
    //Añadir filtro
    const cardId = `${publicaciones[i].id}`;
    pubhtml.innerHTML += `
  <div class="d-flex justify-content-center mt-5">
    <div class="card mb-5 mx-auto" style="width: 18rem;">
      <div class="card-header text-end">
        <button type="button" class="btn btn-primary bi bi-pencil"></button>
        <button type="button" class="btn btn-danger bi bi-x-circle delete-button" data-card-id="${cardId}"></button>
      </div>
      <img src="${publicaciones[i].img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${publicaciones[i].titulo}</h5>
        <p class="card-text">${publicaciones[i].texto}</p>
      </div>
    </div>
  </div>
  `;
  }
}

function pubNormal() {
  for (let i = 0; i < publicaciones.length; i++) {
    //publicaciones[i];
    //Añadir filtro
    pubhtml.innerHTML += `
  <div class="d-flex justify-content-center mt-5">
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
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
      const uid = user.uid;
      const docRef = doc(db, "Users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().admin===true) {
          pubAdmin();
          menu.innerHTML+=`
          <li class="nav-item">
            <a href="./subirPublicacion.html"><button type="button" class="btn" style="color: white; border-color: white;">Crear Publicación</button></a>
          </li>
          `;
        }
        else{
          pubNormal();
        }
      } else {
        pubNormal();
      }
    } else {
      pubNormal();
    }
  });

// Select all delete buttons
const deleteButtons = pubhtml.querySelectorAll('.delete-button');

// Add event listener to each delete button
deleteButtons.forEach((button) => {
  button.addEventListener('click', confirmarEliminar);
  button.addEventListener('click', deleteCard);
});

async function confirmarEliminar() {
  window.confirm("¿Esta seguro de eliminar esta publicación?");

}

function deleteCard(event){
  const cardId = event.target.getAttribute('data-card-id');
  deletePub(db, cardId);
  console.log(cardId);
}

function logOut() {
  signOut(auth).then(() => {
    alert("Sign-out successful.")
  }).catch((error) => {
    alert(error)
  });
}

//console.log(publicaciones[0].id);