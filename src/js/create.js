import { collection, addDoc,doc,getDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { publicacion } from "./publicacion.js";
import {db,storage,auth} from "./firebase.js"
import { ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const form = document.querySelector('#subPub');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data().admin===true) {
            form.innerHTML+=`
            <div class="form-group">
            <label for="publication_title">Título:</label>
            <input
              type="text"
              class="form-control"
              id="publication_title"
              name="publication_title"
            />
          </div>
          <div class="form-group">
            <label for="publication_content">Contenido:</label>
            <textarea
              class="form-control"
              id="publication_content"
              name="publication_content"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="sel1">Selecciona escuela:</label>
            <select class="form-control" id="sel1">
              <option>Ingenieria</option>
              <option>Derecho</option>
              <option>Negocios</option>
              <option>Gastronomia</option>
              <option>Medicina</option>
            </select>
          </div>
          <div class="form-group text-center my-5">
            <label for="publication_image" class="custom-file-upload">
              <i class="fa fa-cloud-upload"></i> Subir imagen
            </label>
            <input
              type="file"
              class="form-control-file"
              id="publication_image"
              name="publication_image"
            />
          </div> 
          <div class="text-center mb-5">
            <button type="submit" class="btn btn-primary custom_button">
              Enviar
            </button>
          </div>
            `
          }
        }
      }
    });

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