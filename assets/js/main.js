document.addEventListener("DOMContentLoaded", function () {
    // Initialize Supabase (FIXED: Now declared before usage)
    const supabase = window.supabase.createClient(
        "https://hgwkiavwpalxlbgzcifk.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnd2tpYXZ3cGFseGxiZ3pjaWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Njg1NzgsImV4cCI6MjA1NzQ0NDU3OH0.n2mSxtgGP-5Esk3hS7tllVDfAv8iFIWWC4KMxg64FVc"
    );

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    // Show pop-up messages
    function showPopup(message, success = true) {
        alert(message); // Simple pop-up (Replace with a custom modal if needed)
    }

    // SIGNUP FUNCTION (FIXED)
    if (signupBtn) {
        signupBtn.addEventListener("click", async () => {
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();

            if (!email || !password) {
                showPopup("Email and password are required.", false);
                return;
            }

            let { error } = await supabase.auth.signUp({ email, password });

            if (error) {
                showPopup(error.message, false);
            } else {
                showPopup("Signup successful! Check your email.", true);
                setTimeout(() => { window.location.href = "login.html"; }, 2000);
            }
        });
    }

    // LOGIN FUNCTION (FIXED)
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            if (!email || !password) {
                showPopup("Email and password are required.", false);
                return;
            }

            let { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                showPopup(error.message, false);
            } else {
                showPopup("Login successful! Redirecting to Dashboard...", true);
                setTimeout(() => { window.location.href = "dashboard.html"; }, 2000);
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
