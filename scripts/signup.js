import { supa } from "../config/config.js";

async function signUp() {
    event.preventDefault();
    console.log('Signup wurde aufgerufen');
    const nachname = document.getElementById('nachname').value;
    const vorname = document.getElementById('vorname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signUp({ email, password, vorname, nachname });

    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
    }
}

const signUpButton= document.getElementById('signUpButton');
signUpButton.addEventListener('click',signUp);
