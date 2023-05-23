import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";
import {db} from "./firebase.js"

const form = document.querySelector('#subPub');

// Add a new document with a generated id.
export async function createPub(db, newData) {
    const docRef = await addDoc(collection(db, 'Publicaciones'), {
        escuela: newData.escuela,
        img: newData.img,
        texto: newData.texto,
        titulo: newData.titulo,
        disponible:true,
        escuela:newData.escuela
      });
    console.log("Document written with ID: ", docRef.id);
    location.href="index.html";
}

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    //constantes
    //const email = formLogin['email'].value;
    //const password = formLogin['contrasena'].value;
    const newPublicacion = new publicacion('00',form['publication_title'].value, form['publication_content'].value, "https://imgur.com/FjN9kSw"/* form['publication_image'].value, */ ,"Ingenieria");

    
    //console.log(email,password);
    
    try {
        createPub(db, newPublicacion);
    } 
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});