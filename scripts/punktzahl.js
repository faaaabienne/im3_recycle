import { supa } from "../config/config.js";

var currentUser = supa.auth.user()
console.log(currentUser.id)

async function fetchPoints() {
  const { data: userCategories, error: userCategoriesError } = await supa
    .from('User_has_category')
    .select('category_id')
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
