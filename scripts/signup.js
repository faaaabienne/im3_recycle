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

// JavaScript-Code, um den Footer anzuzeigen, wenn der Benutzer ans Ende der Seite scrollt
window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer');
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.offsetHeight;
    var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  
    // Überprüfen, ob der Benutzer ganz unten auf der Seite ist
    if (scrollPosition + windowHeight >= bodyHeight) {
      footer.classList.remove('footer-hidden'); // Footer anzeigen
    } else {
      footer.classList.add('footer-hidden'); // Footer ausblenden
    }
  });
