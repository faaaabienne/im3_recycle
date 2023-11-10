import { supa } from "../config/config.js";

// Function to upsert user data into the "User" table
async function upsertUser(email, first_name, last_name) {
    console.log('Upserting user data:', email, first_name, last_name);

    let data; // Declare the data variable outside the try block

    try {
        // Fetch the user with the specified email from the "User" table
        const { data: existingUser, error: fetchError } = await supa
            .from('User')
            .select('*')
            .eq('email', email);

        if (fetchError) {
            throw new Error(`Error fetching user data: ${fetchError.message}`);
        }

        // Upsert data into the "User" table
        const upsertResult = await supa
            .from('User')
            .upsert([
                {
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    users_id: existingUser ? existingUser[0].users_id : undefined,
                }
            ], { onConflict: ['email'] });

        // Assign the data from the upsertResult to the data variable
        data = upsertResult.data;

        console.log("Data inserted into User table:", data);
    } catch (error) {
        console.error(error.message);
    }

    return data; // You can return the data or do further processing as needed
}


// Function zum Login using email and password
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
        window.location.href = "/devices.html";
    }
}

// Eventlisteners for Buttons
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', signUp);

// Function to update user status
function updateUserStatus(user) {
    const userStatusElement = document.getElementById('userStatus');

    if (!userStatusElement) {
        console.error("Error: 'userStatus' element not found.");
        return;
    }
    if (user) {
        userStatusElement.textContent = `Authenticated as: ${user.email}`;
    } else {
        userStatusElement.textContent = "Not authenticated.";
    }
}
// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);


// Listener for authentication state changes
supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        console.log("User signed in: ", session.user);
        updateUserStatus(session.user);
    } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        updateUserStatus(null);
    }
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

