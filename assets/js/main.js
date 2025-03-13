const supabase = supabase.createClient(
    "https://hgwkiavwpalxlbgzcifk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnd2tpYXZ3cGFseGxiZ3pjaWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Njg1NzgsImV4cCI6MjA1NzQ0NDU3OH0.n2mSxtgGP-5Esk3hS7tllVDfAv8iFIWWC4KMxg64FVc"
);

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    // SIGNUP FUNCTION
    if (signupBtn) {
        signupBtn.addEventListener("click", async () => {
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const authMessage = document.getElementById("authMessage");

            if (!email || !password) {
                authMessage.textContent = "Email and password are required.";
                authMessage.style.color = "red";
                return;
            }

            let { error } = await supabase.auth.signUp({ email, password });

            if (error) {
                authMessage.textContent = error.message;
                authMessage.style.color = "red";
            } else {
                authMessage.textContent = "Signup successful! Check your email.";
                authMessage.style.color = "green";
                setTimeout(() => { window.location.href = "login.html"; }, 2000);
            }
        });
    }

    // LOGIN FUNCTION
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const authMessage = document.getElementById("authMessage");

            if (!email || !password) {
                authMessage.textContent = "Email and password are required.";
                authMessage.style.color = "red";
                return;
            }

            let { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                authMessage.textContent = error.message;
                authMessage.style.color = "red";
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }

    // CHECK USER AUTH STATUS (REDIRECT TO DASHBOARD IF LOGGED IN)
    async function checkAuth() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && window.location.pathname.includes("login.html")) {
            window.location.href = "dashboard.html";
        }
    }

    checkAuth();
});
