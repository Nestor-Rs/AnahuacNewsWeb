import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";
import {db,storage} from "./firebase.js"
import { ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js"

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
    const archivoref = ref(storage, `img/${form['publication_image'].files[0].name}`);

    try {
        
        uploadBytes(archivoref, form['publication_image'].files[0]).then((snapshot) => {
            getDownloadURL(archivoref).then((url) => {
                const newPublicacion = new publicacion('00',form['publication_title'].value, form['publication_content'].value, url,form['sel1'].value);
                createPub(db, newPublicacion);
            });
        });
        
        //const newPublicacion = new publicacion('00',form['publication_title'].value, form['publication_content'].value, "https://imgur.com/FjN9kSw" ,"Ingenieria");
        //createPub(db, newPublicacion);
    }
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});