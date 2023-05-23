import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion";
import {db} from "./main.js"
const form = document.querySelector('#');

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
}

formLogin.addEventListener('submit',async(e)=>{
    e.preventDefault();
    //constantes
    //const email = formLogin['email'].value;
    //const password = formLogin['contrasena'].value;
    const newPublicacion = new publicacion('00',form['publication_title'].value, form['publication_content'].value, form['publication_image'].value, form["sel1"].value);

    createPub(db, newPublicacion);
    //console.log(email,password);
    
    try {
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        console.log(userCredentials);
        location.href="index.html";
    } 
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});