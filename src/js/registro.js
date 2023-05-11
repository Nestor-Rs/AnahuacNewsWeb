import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { auth } from "./firebase.js";

const registerForm = document.querySelector('#register');

registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = registerForm['email'].value;
    const password = registerForm['contra'].value;

    //console.log(email,password);
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        console.log(userCredentials);
        alert("Registro Correcto")
        location.href="login.html";
    } 
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});