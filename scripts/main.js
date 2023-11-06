import { supa } from "../config/config.js";

// Login wird aufgerufen
async function login() {
    // event.preventDefault();
    console.log('Login wurde aufgerufen');
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordInput').value;

    const { response } = await supa.auth.signIn({ email, password });

    console.log(response);
    if (response) {
        console.error("Error during login: ", response.message);
        window.location.href = "devices.html";
    } else {
        console.log("Logged in as ", email);
        window.location.href = '/devices.html';
    }
}
// Login Button
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', login);

