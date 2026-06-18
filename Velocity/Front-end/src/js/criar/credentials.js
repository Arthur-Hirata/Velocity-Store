const inputNome= document.getElementById("name")
const inputNumero = document.getElementById("number")
const inputEndereco= document.getElementById("endereço")
const regexCEP =/^[0-9]{5}-?[0-9]{3}$/
const regexCelular = /^\(?[1-9]{2}\)? ?9[0-9]{4}-?[0-9]{4}$/

function finalizarCriação(){
    const nome = inputNome.value
    const numero = inputNumero.value
    const endereco = inputEndereco.value
    const validName = nome.trim()
    const validAddress = endereco.trim()
    console.log(validAddress)
    let hasName = false 
    let hasNumber = false
    let hasAddress = false
    const userID = localStorage.getItem('userId')
    if (validName.length > 0) {
        hasName = true
    } else{
        const err = document.getElementById("erro-nome")
        err.style.display = "block"
    } if (regexCelular.test(numero)) {
        hasNumber = true
    } else {
        const err = document.getElementById("erro-celular")
        err.style.display = "block"
    } if (regexCEP.test(endereco)){
        hasAddress = true
    } else {
        const err = document.getElementById("erro-CEP")
        err.style.display = "block"
    }
    let canComplete = hasName && hasNumber && hasAddress

    if (canComplete){
        fetch('http://127.0.0.1:5000/credenciais', {
            method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userID,
                    nome: nome,
                    numero : numero,
                    address : endereco
                })
        })
        .then(response => {
                if (!response.ok) {
                    throw new Error("Resposta do servidor não foi OK");
                }
                return response.json();
            })
            .then(data => {
                console.log("Resposta:", data);
                setTimeout(function(){
                        window.location.href='loader.html'
                    },)
            })
            .catch(err => {
                console.error("Erro no fetch:", err)
            })
    }
}