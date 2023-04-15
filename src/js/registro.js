import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { auth } from "./firebase.js";

const formLogin = document.querySelector('#register');

formLogin.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = formLogin['email'].value;
    const password = formLogin['contra'].value;

    //console.log(email,password);
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        console.log(userCredentials);
        document.querySelector
    } 
    catch (error) {
        console.log(error);
    }

});