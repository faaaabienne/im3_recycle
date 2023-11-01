import { supa } from "../config/config.js";


async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signIn({ email, password });
    if (user) {
        showDashboard(user);
    } else {
        alert(error.message);
    }
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signUp({ email, password });
    if (user) {
        showDashboard(user);
    } else {
        alert(error.message);
    }
}

function showDashboard(user) {
    document.getElementById('auth').hidden = true;
    document.getElementById('dashboard').hidden = false;
    document.getElementById('userEmail').textContent = user.email;
    // Get and display points (from Supabase DB)
}

async function addPoints() {
    // Add points to user in Supabase DB and display updated points
}

async function logout() {
    await supabase.auth.signOut();
    document.getElementById('auth').hidden = false;
    document.getElementById('dashboard').hidden = true;
}

// Check if user is already logged in
const user = supabase.auth.user();
if (user) {
    showDashboard(user);
}
