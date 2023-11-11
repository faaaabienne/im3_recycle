document.addEventListener('DOMContentLoaded', () => {
    const weiterButton = document.querySelector('.weiterButton');

    weiterButton.addEventListener('click', async () => {
        const selectedCategory = document.querySelector('input[name="kategorie"]:checked').value;

        if (selectedCategory) {
            // Hier fügen Sie den Code hinzu, um die Auswahl in Ihrer Datenbank zu speichern
            // Zum Beispiel mit Supabase:
            const { user, error } = await supabase.auth.user();
            if (error) {
                console.error(error);
                return;
            }

            if (!user) {
                console.error('Benutzer nicht angemeldet');
                return;
            }

        }

        if (user) {
            const { data, error } = await supabase
                .from('user_has_category')
                .upsert([
                    {
                        user_id: user.id,
                        category: selectedCategory,
                    }
                ]);

            if (error) {
                console.error(error);
                return;
            }

            console.log('Auswahl gespeichert:', data);
        }

        // Hier können Sie den Benutzer zur nächsten Seite weiterleiten
        window.location.href = 'stores.html';
    });

});
