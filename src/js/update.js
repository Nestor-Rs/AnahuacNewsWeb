import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

await export function  updatePub(db,object,id) {
    const docRef = doc(db, objects, id);
    const updateTimestamp = updateDoc(docRef, {
        timestamp: serverTimestamp()
    });
}