import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

export async function updatePub(db, newData) {
    const docRef = doc(db, 'Publicaciones', newData.id);
    try {
        await updateDoc(docRef, {
            escuela: newData.escuela,
            img: newData.img,
            texto: newData.texto,
            titulo: newData.titulo
        });   
    } catch (error) {
        console.log(error);
    }
}