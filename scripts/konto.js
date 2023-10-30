import { supa } from "../../../scripts/konto.js";

async function showMovies() {s
  const ul = document.querySelector('#list');
  const { data: movies, error } = await supa.from("movies").select();
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = movie.title;
    ul.appendChild(li);
  })
}
showMovies();

async function showActors() {
  const table = document.querySelector('#table');
  const { data: actors, error } = await supa.from("actors").select();
  actors.forEach(actor => {
    const output = `
      <tr>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.user_points}</td>
      </tr>
    `;
    table.innerHTML += output;
  })
}
showActors();




// Annahme: user ist der angemeldete Benutzer (mithilfe von Supabase auth)
const user = supabase.auth.user();

if (user) {
  // Der Benutzer ist angemeldet, hole seine Daten aus der Tabelle 'users'
  const { data, error } = await supabase
    .from('User')
    .select('first_name, last_name, email, user_points') // Wähle die Spalten, die du benötigst
    .eq('id', user.id);    // Filtere nach der ID des angemeldeten Benutzers

  if (error) {
    console.error(error.message);
  } else {
    // Annahme: data enthält die Benutzerdaten als Objekt
    const userData = data[0]; // Wir nehmen an, es gibt nur einen Benutzer mit dieser ID

    // Setze die Daten in die HTML-Elemente auf der konto.html Seite
    document.getElementById('first_name').textContent = `Vorname: ${userData.name}`;
    ocument.getElementById('last_name').textContent = `Name: ${userData.name}`;
    document.getElementById('email').textContent = `Email: ${userData.email}`;
    document.getElementById('user_points').textContent = `Punktestand: ${userData.points}`;
  }
} else {
  // Der Benutzer ist nicht angemeldet
  // Führe hier entsprechende Aktionen aus (z.B. Umleitung zur Anmeldeseite)
}
