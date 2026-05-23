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
    const verInfo=  document.getElementById("ver-info")
    const verPedidos=document.getElementById("ver-pedidos")
    const title= document.querySelector(".tit")

    verInfo.addEventListener("click", function(){
        const infogeral = document.querySelector(".infos")
        const list = document.querySelector(".lista")
        const lista=document.querySelector(".listaProdutos")
        lista.style.visibility = "hidden"
        infogeral.style.visibility = "visible"
        list.style.visibility = "hidden"
        title.textContent = "Revise suas informações"
    })
    verPedidos.addEventListener("click", function(){
        const infogeral = document.querySelector(".infos")
        infogeral.style.visibility = "hidden"
        const list = document.querySelector(".lista")
        list.style.visibility = "visible"
        title.textContent = "Sua lista de compras"
        const lista=document.querySelector(".listaProdutos")
        lista.style.visibility = "visible"
        fetch('http://127.0.0.1:5000/mostrar', {
            method : 'POST',
            body: JSON.stringify({
                id_user : userId
            })
        })
        .then(resposta => resposta.json())
        .then(listaProdutos =>{
            listaProdutos.forEach(produto =>{
                lista.innerHTML = ""
                const li = document.createElement("li")
                li.className = "item-lista"
            })
        })
    })





}