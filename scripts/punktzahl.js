/*import { supa } from "../config/config.js";

var currentUser = supa.auth.user()
console.log(currentUser.id)

async function fetchPoints() {
  try {
    const { data: userCategories, error: userCategoriesError } = await supa
      .from('User_has_category')
      .select('category_id',)
      .eq('user_id', currentUser.id);

    if (userCategoriesError) {
      console.error(userCategoriesError);
      return;
    }

    const categoryIds = userCategories.map(category => category.category_id);

    const { data: categories, error: categoriesError } = await supa
      .from('Categories')
      .select('category_points')
      .in('id', categoryIds);

    if (categoriesError) {
      console.error(categoriesError);
      return;
    }

    const totalPoints = categories.reduce((acc, category) => acc + category.category_points, 0);
    console.log('Total Points:', totalPoints);

    // Update the HTML element with the totalPoints
    document.getElementById('category_points').textContent = totalPoints;

  } catch (error) {
    console.error('Error fetching and updating points:', error);
  }

}

// Call fetchPoints to initiate the process
fetchPoints(); */

import { supa } from "../config/config.js";

document.addEventListener("DOMContentLoaded", function () {
  var currentUser = supa.auth.user();

  async function fetchPoints() {
    try {
      const { data: userCategories, error: userCategoriesError } = await supa
        .from('User_has_category')
        .select('category_id',)
        .eq('user_id', currentUser.id);

      if (userCategoriesError) {
        console.error(userCategoriesError);
        return;
      }

      const categoryIds = userCategories.map(category => category.category_id);

      const { data: categories, error: categoriesError } = await supa
        .from('Categories')
        .select('category_points')
        .in('id', categoryIds);

      if (categoriesError) {
        console.error(categoriesError);
        return;
      }

      const totalPoints = categories.reduce((acc, category) => acc + category.category_points, 0);
      console.log('Total Points:', totalPoints);

      // Update the HTML element with the totalPoints
      document.getElementById('category_points').textContent = totalPoints;

      // Update the progress bar
      updateProgressBar(totalPoints);

    } catch (error) {
      console.error('Error fetching and updating points:', error);
    }
  }

  function updateProgressBar(totalPoints) {
    const maxPoints = 100; // Assuming 100 is the maximum points
    const percentage = (totalPoints / maxPoints) * 100;
    const progressBar = document.getElementById('punktestandFortschritt');
    progressBar.style.width = percentage + '%';
  }

  // Call fetchPoints to initiate the process
  fetchPoints();
});


// JavaScript-Code, um den Footer allmählich anzuzeigen, wenn der Benutzer ans Ende der Seite scrollt
var footer = document.querySelector('footer');
var footerHidden = true; // Um zu verfolgen, ob der Footer gerade angezeigt oder ausgeblendet ist

window.addEventListener('scroll', function () {
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
    requestAnimationFrame(function () {
      footer.style.transition = 'opacity 0.5s'; // CSS-Übergang hinzufügen
      footer.style.opacity = '1'; // Die Opazität auf 1 erhöhen, um den Footer anzuzeigen
    });
  } else if (scrollPosition < scrollTrigger && !footerHidden) {
    // Den Footer allmählich ausblenden
    footerHidden = true;
    footer.style.opacity = '1'; // Startwert der Opazität auf 1 setzen
    requestAnimationFrame(function () {
      footer.style.transition = 'opacity 0.5s'; // CSS-Übergang hinzufügen
      footer.style.opacity = '0'; // Die Opazität auf 0 verringern, um den Footer auszublenden
      footer.addEventListener('transitionend', function () {
        if (footerHidden) {
          footer.classList.add('footer-hidden'); // Den Footer ausblenden, nachdem der Übergang abgeschlossen ist
          footer.style.transition = ''; // Übergang entfernen, um für das Einblenden vorzubereiten
        }
      }, { once: true });
    });
  }
});
