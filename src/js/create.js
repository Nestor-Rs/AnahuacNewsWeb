import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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