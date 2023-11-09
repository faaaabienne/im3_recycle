import { supa } from "../config/config.js";

var currentUser = supa.auth.user()
console.log(currentUser)

const weiterButton = document.querySelector('#weiterButton');
weiterButton.addEventListener('click', insertInput);

async function insertInput() {
  const input = document.querySelector('input[name="kategorie"]:checked').value;
  console.log('input', '<' + input + '>');
  
  const { data, error } = await supa
    .from('Categories')
    .select()
    .eq('category_name', input)

  console.log(data, error);
  console.log(data[0].id);
  console.log(currentUser.id);

  const { data: insertedData, error: insertError } = await supa
    .from('User_has_category')
    .insert([
      {
        'user_id': currentUser.id,
        'category_id': data[0].id
      }
    ]);

  console.log(insertedData, insertError);
}
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
