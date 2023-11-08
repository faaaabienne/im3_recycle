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


// Function to update user status
function updateUserStatus(user) {
    const userStatusElement = document.getElementById('userStatus');

    if (user) {
        userStatusElement.textContent = `Authenticated as: ${user.email}`;
    } else {
        userStatusElement.textContent = "Not authenticated.";
    }
}

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginButton').addEventListener('click', login);
// document.getElementById('signUpButton').addEventListener('click', signUp);

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