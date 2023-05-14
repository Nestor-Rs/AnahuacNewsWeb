import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

export async function deletePub(db, id) {
    const docRef = doc(db, 'Publicaciones', id);
    try {
        await updateDoc(docRef, {
            disponible:false
        });   
    } catch (error) {
        console.log(error);
    }
}