// Annahme: user ist der angemeldete Benutzer (mithilfe von Supabase auth)
const User = supabase.auth.user();

if (User) {
  // Der Benutzer ist angemeldet, hole seine Daten aus der Tabelle 'users'
  const { data, error } = await supabase
    .from('users')
    .select('name, email') // Wähle die Spalten, die du benötigst
    .eq('id', user.id);    // Filtere nach der ID des angemeldeten Benutzers

  if (error) {
    console.error(error.message);
  } else {
    // Annahme: data enthält die Benutzerdaten als Objekt
    const userData = data[0]; // Wir nehmen an, es gibt nur einen Benutzer mit dieser ID
    // Jetzt kannst du die Daten in deine HTML-Elemente einfügen
    document.getElementById('name').textContent = `Name: ${userData.name}`;
    document.getElementById('email').textContent = `Email: ${userData.email}`;
  }
} else {
  // Der Benutzer ist nicht angemeldet
  // Führe hier entsprechende Aktionen aus (z.B. Umleitung zur Anmeldeseite)
}
