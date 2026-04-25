
const olho = document.getElementById("eye1")
const inputSenha = document.getElementById("senha1")
olho.addEventListener("click", function(){
    if (inputSenha.type === "password"){
        inputSenha.type = "text"
        olho.classList = "fas fa-eye-slash"
    } else{
        inputSenha.type = "password"
        olho.classList = "fas fa-eye"
    }
})
const olho2 = document.getElementById("eye2")
const inputSenha2 = document.getElementById("senha2")
olho2.addEventListener("click", function(){
    if (inputSenha2.type === "password"){
        inputSenha2.type = "text"
        olho2.classList = "fas fa-eye-slash"
    } else{
        inputSenha2.type = "password"
        olho2.classList = "fas fa-eye"
    }
})
function criarConta(){
    const senha1 = document.getElementById("senha1")
    const senha = senha1.value
    const senha2 = document.getElementById("senha2")
    const senhaConfirm = senha2.value
    let canCreatebyPassowrd = false
    let canCreatebyConfirmation = false
    let canCreatebyMail= false
    const erro1 = document.getElementById("erro1")
    const erro2 = document.getElementById("erro2")
    const erro3 = document.getElementById('erro3')
    const regex = /\S+@\S+\.\S+/
    const email = document.getElementById('email')
    const userEmail = email.value
    
    if ((regex.test(userEmail))){
        canCreatebyMail = true
        erro3.style.display = 'none'
    } else {
        erro3.style.display = "block"
    }
    
    if (senha.length >= 8){
        canCreatebyPassowrd = true
        erro1.style.display = "none"
    } else {
        erro1.style.display = "block"
    }
    if (senha === senhaConfirm){
        canCreatebyConfirmation = true
        erro2.style.display = "none"
    } else {
        erro2.style.display = "block"
    }
    let canCreate = canCreatebyConfirmation && canCreatebyPassowrd && canCreatebyMail
    if (canCreate){
        const box = document.querySelector('.box')
        box.style.display= 'none'
        document.getElementById('loader').style.visibility = 'visible';
    setTimeout(function() {
        window.location.href = 'Velocity.html'; 
    }, 3000);
    }
}

