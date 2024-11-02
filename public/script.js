document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        document.getElementById("message").innerText = result.message;

        // Redirigir si el inicio de sesión es exitoso
        if (result.message === "Inicio de sesión exitoso") {
            window.location.href = "dashboard.html"; // Redirige a la nueva página
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error de conexión";
    }
});
