const olho = document.getElementById("eye-password")
const inputSenha = document.getElementById("senha")
olho.addEventListener("click", function(){
    if (inputSenha.type === "password"){
        inputSenha.type = "text"
        olho.classList = "fas fa-eye-slash"
    } else{
        inputSenha.type = "password"
        olho.classList = "fas fa-eye"
    }
})

function login(){
    const email= document.getElementById("email").value // se refere ao conteúdo do input
    const senha= document.getElementById("senha").value 
    const mail = document.getElementById("email") // se refere ao input
    const password = document.getElementById("senha")
    fetch('http://127.0.0.1:5000/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                senha : senha
            })
    })
    .then(response => {
       // if (!response.ok) throw response --> se ficar com essa parte ele só para o código caso a response não for 200, por isso não tava funcionando o negócio das senhas
        return response.json()
    })
    .then(data =>{
        if (data.mensagem === "Login bem sucedido!") {
            window.location.href = "loader-login.html"
        }
        else if (data.mensagem === "Senha incorreta") {
            const erroSenha=document.getElementById("senha-incorreta")
            const erroEmail = document.getElementById("e-mail-incorreto")
            erroSenha.style.display = "block"
            erroEmail.style.display = "none"
            password.value=""
        } else if (data.mensagem === "Erro, usuário não encontrado") {
            const erroEmail = document.getElementById("e-mail-incorreto")
            erroEmail.style.display = "block"
            mail.value=""
            password.value= ""
        }
    })    
        .catch(err => {
            console.error("Erro no fetch:", err)
        });
}