import { supa } from "../config/config.js";

// Function to upsert user data into the "User" table
async function upsertUser(email, users_id) {
    console.log('Upserting user data:', email, users_id);

    const { data, error } = await supa
        .from('User')
        .upsert([
            {
                email: email,
                users_id: users_id,
            }
        ], { onConflict: ['email'] }); // Specify the conflict resolution strategy (use the email as the conflict key)

    if (error) {
        console.error("Error during upsert into User table: ", error.message, error);
    } else {
        console.log("Data inserted into User table: ", data);
    }
}

// Function to handle user login
async function login() {
    event.preventDefault();
    console.log('Login wurde aufgerufen');
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const { user, error } = await supa.auth.signIn({ email, password });

        if (error) {
            console.error("Error during login: ", error.message);
            // Display an error message or handle it in your UIxc
        } else {
            console.log("Logged in as ", email);

            // Wait for upsertUser to complete before moving to the next step
            await upsertUser(email, user.id);

            // Navigate to "devices.html" upon successful login
            window.location.href = "/devices.html";
        }
    } catch (error) {
        console.error("Error during login: ", error.message);
        // Handle login error
    }
}

// Event listener for the login button
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', login);

// JavaScript code to gradually show the footer when the user scrolls to the end of the page
var footer = document.querySelector('footer');
var footerHidden = true;

window.addEventListener('scroll', function() {
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.offsetHeight;
    var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    var scrollTrigger = bodyHeight - windowHeight;

    if (scrollPosition >= scrollTrigger && footerHidden) {
        footerHidden = false;
        footer.style.opacity = '0';
        footer.classList.remove('footer-hidden');
        requestAnimationFrame(function() {
            footer.style.transition = 'opacity 0.5s';
            footer.style.opacity = '1';
        });
    } else if (scrollPosition < scrollTrigger && !footerHidden) {
        footerHidden = true;
        footer.style.opacity = '1';
        requestAnimationFrame(function() {
            footer.style.transition = 'opacity 0.5s';
            footer.style.opacity = '0';
            footer.addEventListener('transitionend', function() {
                if (footerHidden) {
                    footer.classList.add('footer-hidden');
                    footer.style.transition = '';
                }
            }, { once: true });
        });
    }
});
