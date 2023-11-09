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

// JavaScript-Code, um den Footer allmählich anzuzeigen, wenn der Benutzer ans Ende der Seite scrollt
var footer = document.querySelector('footer');
var footerHidden = true; // Um zu verfolgen, ob der Footer gerade angezeigt oder ausgeblendet ist

window.addEventListener('scroll', function() {
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;
  var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  var scrollTrigger = bodyHeight - windowHeight; // Trigger-Punkt, wenn der Footer allmählich angezeigt/ausgeblendet werden soll

  // Überprüfen, ob der Benutzer nahe genug am Ende der Seite ist
  if (scrollPosition >= scrollTrigger && footerHidden) {
    // Den Footer allmählich einblenden
    footerHidden = false;
    footer.style.opacity = '0'; // Startwert der Opazität auf 0 setzen
    footer.classList.remove('footer-hidden');
    requestAnimationFrame(function() {
      footer.style.transition = 'opacity 0.5s'; // CSS-Übergang hinzufügen
      footer.style.opacity = '1'; // Die Opazität auf 1 erhöhen, um den Footer anzuzeigen
    });
  } else if (scrollPosition < scrollTrigger && !footerHidden) {
    // Den Footer allmählich ausblenden
    footerHidden = true;
    footer.style.opacity = '1'; // Startwert der Opazität auf 1 setzen
    requestAnimationFrame(function() {
      footer.style.transition = 'opacity 0.5s'; // CSS-Übergang hinzufügen
      footer.style.opacity = '0'; // Die Opazität auf 0 verringern, um den Footer auszublenden
      footer.addEventListener('transitionend', function() {
        if (footerHidden) {
          footer.classList.add('footer-hidden'); // Den Footer ausblenden, nachdem der Übergang abgeschlossen ist
          footer.style.transition = ''; // Übergang entfernen, um für das Einblenden vorzubereiten
        }
      }, { once: true });
    });
  }
});
