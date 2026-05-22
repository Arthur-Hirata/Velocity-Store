const userId = localStorage.getItem("userId")

if (userId && userId !==""){
    getCredentials()
    function getCredentials(){
        fetch('http://127.0.0.1:5000/getInfo',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId : userId
            })
        })
        .then(response => response.json())
    .then(data => {
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const senha = document.getElementById("senha")
        const tel = document.getElementById("telefone")
        const CEP = document.getElementById("cep")
            if (data){
                name.textContent = data.nome
                email.textContent = data.email
                senha.textContent = "*********"
                tel.textContent = data.tel
                CEP.textContent = data.cep
            }
        })
    .catch(err => console.error("Erro no fetch:", err));
    }

    const btnalertExc = document.getElementById("excluir")
    btnalertExc.addEventListener("click", function(){
        const overlay = document.querySelector(".overlay")
        
        if (overlay){
            overlay.style.display= "flex"
        }
    });
    const bntVoltar = document.querySelector(".vlt")
    bntVoltar.addEventListener("click", function(){
        const overlay =document.querySelector(".overlay")
        if (overlay) {
            overlay.style.display = "none"
        }
    })
    function excluirConta(){
        fetch('http://127.0.0.1:5000/deleteAcc', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId : userId
            })
        })
        .then(response => response.json())
        .then(data=>{
            if (data.mensagem === "Conta deletada com sucesso"){
                console.log("Deletou")
                localStorage.removeItem('userId')
            } else {
                console.log("Sua conta não foi excluida")
            }
        })
        .catch(error => {
        console.error("Erro na requisição de rede:", error);
    });
    }
    const verPedidos=document.getElementById("ver-pedidos")
    const title= document.querySelector(".tit")

    verPedidos.addEventListener("click", function(){
        const infogeral = document.querySelector(".infos")
        infogeral.style.visibility = "hidden"
        title.textContent = "Sua lista de compras"
        
    })
}