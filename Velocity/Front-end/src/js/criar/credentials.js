const inputNome= document.getElementById("name")
const inputNumero = document.getElementById("number")
const inputEndereco= document.getElementById("endereço")
const nome = inputNome.value
const numero = inputNumero.value
const endereco = inputEndereco.value

function finalizarCriação(){
    fetch('http://127.0.0.1:5000/credenciais', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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