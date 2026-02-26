const form = document.getElementById("form");  
const username = document.getElementById("username"); 
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {  
    event.preventDefault();

    checkForm();

})

email.addEventListener("blur", () => {  
    checkInputEmail();
})

username.addEventListener("blur", () => {
    checkInputUsername();
})



function checkInputUsername() {  
    const usernameValue = username.value; 

    if (usernameValue === "") {
        
        errorInput(username, "O nome de usuário é obrigatório")
    } else {
     
        const formItem = username.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputEmail() { 
    const emailValue = email.value;
    if (emailValue === "") {
       
        errorInput(email, "O email é obrigatório")
    } else {
       
        const formItem = email.parentElement;
        formItem.className = "form-content"

    }
}

function checkInputPassword() {  
    const passwordValue = password.value;

    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória")
    } else if (passwordValue.length < 8) {  
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres")
    } else {
        const formItem = password.parentElement;    
        formItem.className = "form-content"
    }

}

function checkInputPasswordConfirmation() {  
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value

    if (passwordValue === "") {
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
    } else if (confirmationPasswordValue !== passwordValue) {
        errorInput(passwordConfirmation, "As senhas não são iguais")
    } else {
        const formItem = passwordConfirmation.parentElement;
        formItem.className = "form-content"

    }
}


async function checkForm() {  
    console.log("checkForm chamado!");

    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();

    const formItems = form.querySelectorAll(".form-content")    

    const isValid = [...formItems].every((item) => {  
        return item.className === "form-content"
    });

    if (isValid) {    
        try {
            console.log("Formulário válido, enviando dados para o backend...")
            const userData = {
                name: username.value,
                email: email.value,
                password: password.value
            }

            const response = await fetch("http://localhost:3000/api/auth/register", {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {  
                throw new Error("Erro ao criar usuário")
            }
            await response.json();

            alert("Usuário criado com sucesso! Agora você pode fazer login.");

            window.location.href = "login.html"; 

        } catch (error) {
            alert("Erro ao criar usuário: ")
            console.log(error)
        }
    }
}


function errorInput(input, message) {  // Exibe o erro visual no campo

    const formItem = input.parentElement; // pega a div pai (wrapper do input)
    const textMessage = formItem.querySelector("a") // pega o elemento que mostrará a mensagem (tagg <a>)
    textMessage.innerText = message;

    formItem.className = "form-content error" // adiciona a classe "error" para mudar visualmente

}