import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { auth,db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const registerForm = document.querySelector('#register');

registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = registerForm['email'].value;
    const password = registerForm['contra'].value;

    //console.log(email,password);
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        await setDoc(doc(db, 'Users', userCredentials.user.uid), { email: userCredentials.user.email, admin: false });
        alert("Registro Correcto");
        location.href="login.html";
    } 
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});