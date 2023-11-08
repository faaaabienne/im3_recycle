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
  
