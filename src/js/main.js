import { app } from "./firebase.js";
import { getFirestore,collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const q = query(collection(db, "Publicaciones"));

let publicaciones=[];

const pubhtml = document.querySelector('#publicaciones');

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  var pub=new publicacion(doc.id,doc.data().titulo,doc.data().texto,doc.data().img);
  publicaciones.push(pub);
});

for (let i = 0; i < publicaciones.length; i++) {
  //publicaciones[i];
  console.log(publicaciones[i].img);
  pubhtml.innerHTML+=
  `<div class="card" style="width: 18rem;">
    <img src="${publicaciones[i].img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${publicaciones[i].titulo}</h5>
      <p class="card-text">${publicaciones[i].texto}</p>
    </div>
  </div>`;  
}