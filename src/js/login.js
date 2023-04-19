import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const formLogin = document.querySelector('#loginForm');

formLogin.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = formLogin['email'].value;
    const password = formLogin['contrasena'].value;

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