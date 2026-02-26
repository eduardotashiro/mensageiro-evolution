const form = document.getElementById("form");
const email = document.getElementById("email"); 
const password = document.getElementById("password"); 

form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    try {
        const loginData = {
            email: email.value, 
            password: password.value
        };

        const response = await fetch("http://localhost:3000/api/auth/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(loginData) 
        });

        if (!response.ok) { 
            throw new Error("Erro ao fazer login"); 
        }

        const data = await response.json(); 

        localStorage.setItem("token", data.token);

        window.location.href = "mensageiro.html";
    } catch (error) {
        alert(`Erro ao fazer login: ${error.message}`); 
    }
});
    

    