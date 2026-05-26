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
    const btnLogout = document.querySelector(".log-out")
    btnLogout.addEventListener("click", function(){
        const overlay = document.querySelector(".overlay2")
        if (overlay){
            overlay.style.display= "flex"
        }
    })
    const bntvoltar2= document.querySelector(".vlt2")
    bntvoltar2.addEventListener("click", function(){
        const overlay = document.querySelector(".overlay2")
        if (overlay){
            overlay.style.display= "none"
        }
    })
    function sairConta(){
        userId.value=""
        window.location.href="Velocity.html"
    }


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
    const mudarSenha = document.getElementById("mudar-senha")
    const title= document.querySelector(".tit")
    const infogeral = document.querySelector(".infos")
    const list = document.querySelector(".lista")
    const changePass= document.querySelector(".change-pass")

    verInfo.addEventListener("click", function(){
        const lista=document.querySelector(".listaProdutos")
        lista.style.visibility="hidden"
        infogeral.style.visibility="visible"
        changePass.style.visibility="hidden"
        list.style.visibility = "hidden"
        title.textContent = "Revise suas informações"
        getCredentials()
    })
    function atualizarPrecoFinal(){
        fetch('http://127.0.0.1:5000/precofinal')
        .then(response => response.json())
        .then(data => {
            const precoFinalElement = document.querySelector('.final-price');
            const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.preco_final);
            precoFinalElement.innerHTML = `Preço Final ${precoFormatado}`;
        })
        .catch(err => console.error('Erro ao buscar preço final:', err));
    }
    function mostrarLista(){
        infogeral.style.visibility = "hidden"
        changePass.style.visibility="hidden"
        list.style.visibility = "visible"
        title.textContent = "Sua lista de compras"
        const lista=document.querySelector(".listaProdutos")
        lista.style.visibility = "visible"
        fetch('http://127.0.0.1:5000/mostrar', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_user: userId
            })
        })
        .then(resposta => resposta.json())
        .then(listaProdutos =>{
            lista.innerHTML=""
            listaProdutos.forEach(produto =>{
                const li = document.createElement("li")
                li.className = "item-lista"
                const spanNome = document.createElement("span")
                const imgItem= document.createElement("img")
                const spanPrice= document.createElement("span")
                const finalPrice=document.querySelector(".final-price")
                spanNome.classList="nome-item"
                imgItem.classList="imagem-item"
                spanPrice.classList="preco-item"
                imgItem.src = produto.imagem
                spanNome.textContent= `${produto.nome}`
                spanPrice.textContent=`${produto.preco}`
                li.append(imgItem)
                li.append(spanNome)
                li.append(spanPrice)
                lista.appendChild(li)
                atualizarPrecoFinal()
                const limparLista =document.querySelector(".limpar-lista")
                limparLista.addEventListener("click", function(){
                    fetch('http://127.0.0.1:5000/apagar', {
                        method : 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id_user : userId
                        })
                     })
                    .then(response => response.json())
                    .then(data =>{
                        mostrarLista();
                        limparLista.style.visibility="hidden"
                        finalPrice.style.visibility = "hidden"
                        })
                    .catch(err => console.error("Erro ao limpar:", err))
                    })
                }) 
                
            })
    }
    mudarSenha.addEventListener("click", function(){
        infogeral.style.visibility="hidden"
        list.style.visibility="hidden"
        changePass.style.visibility="visible"
        title.textContent="Mude sua senha"
    })
    function aplicarEstilopadrao(input){
        input.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.8)";
        input.style.border = "1px solid var(--sombra-branca)";
    }
    function aplicarEstiloerro(input){
        input.style.boxShadow = "none";
        input.style.border = "1px solid red";
    }

    const mudSenha=document.querySelector(".mud-senha")
    mudSenha.addEventListener("click", function(){
        const inputSenhaatual = document.getElementById("senha-atual")
        const senhaAtual= inputSenhaatual.value  
        const erro1 = document.getElementById("erro1")
        const erro2 = document.getElementById("erro2")
        const erro3 = document.getElementById("erro3")
        const newPass =document.getElementById("nova-senha")
        const confimationPass=document.getElementById("confirm-new-pass")
        const senhaNova = newPass.value
        const confirm = confimationPass.value

        erro1.style.display = "none";
        erro2.style.display = "none";
        erro3.style.display = "none";
        aplicarEstilopadrao(inputSenhaatual);
        aplicarEstilopadrao(newPass);
        aplicarEstilopadrao(confimationPass);




        fetch('http://127.0.0.1:5000/ConfirmPassword',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                senhaAtual : senhaAtual
            })
        })
        .then(response => response.json())
        .then(data=>{
            let canChangebyPass = false
            let canChangebyNew = false
            let canChangeByConfirm = false
            if (data.mensagem === "A senha está correta"){
                canChangebyPass = true
                if (senhaNova.length >= 8){
                    canChangebyNew = true
                    

                } else {
                   erro2.style.display="block"
                   aplicarEstiloerro(newPass)
                }
                if (senhaNova === confirm){
                        canChangeByConfirm = true
                } else{
                    erro3.style.display = "block";
                    aplicarEstiloerro(confimationPass);
                }
            } else if (data.mensagem === "A senha está incorreta"){
                erro1.style.display = "block";
                aplicarEstiloerro(inputSenhaatual);


            }
            let canChange = canChangeByConfirm && canChangebyPass && canChangebyNew
            if (canChange){
                fetch('http://127.0.0.1:5000/passwordChange', {
                    method : 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: userId,
                        senhaNova: senhaNova
                    })
                })
                .then(response => response.json())
                .then(data=>{
                    if (data.mensagem ==="A sua senha foi mudada com sucesso"){
                       alert("deu certo");
                       document.getElementById("senha-atual").value = "";
                        document.getElementById("nova-senha").value = "";
                        document.getElementById("confirm-new-pass").value = "";
                    }
                })
            }

        })
    })
}

// SENHA DE TESTE = 12345601