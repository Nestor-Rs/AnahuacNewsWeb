import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const formRecuperar = document.querySelector('#recuperar');

formRecuperar.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const email = formRecuperar['email'].value;

    console.log(email);

    try {
        const mail = await sendPasswordResetEmail(auth,email);
        console.log(mail);
        alert("Revisa tu correo")
    } 
    catch (error) {
        console.log(error);
        alert(error.message);
    }

});