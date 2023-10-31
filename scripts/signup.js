

async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signUp({ email, password });

    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
    }
}