import { supa } from "../config/config.js";

async function signUp() {
    event.preventDefault();
    console.log('Signup wurde aufgerufen');
    const last_name = document.getElementById('nachname').value;
    const first_name = document.getElementById('vorname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordInput').value;

    let signUpInfo = { email: email, password: password, first_name: first_name, last_name: last_name };
    console.log(signUpInfo);
    const { error } = await supa.auth.signUp(signUpInfo);

    if (error) {
        console.error("Error during sign up: ", error.message, error);
    } else {
        console.log("Signed up as ", email, error);
        upsertUser(email, first_name, last_name);
        // window.location.href = "/devices.html";
    }
}

const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', signUp);


async function upsertUser(email, firstname, lastname) {
    const { data, error } = await supa
        .from('User')
        .upsert({ email: email, first_name: firstname, last_name: lastname }, { onConflict: 'email' });
    if (error) {
        console.error('Error updating or inserting user:', error);
    } else {
        console.log('User updated or inserted successfully:', data);
    }
}
