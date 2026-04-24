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