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
        const name2 = document.getElementById("name2")
        const email2 = document.getElementById("email2")
        const tel2 = document.getElementById("telefone2")
        const CEP2 = document.getElementById("cep2")
            if (data){
                name.textContent = data.nome
                email.textContent = data.email
                senha.textContent = "*********"
                tel.textContent = data.tel
                CEP.textContent = data.cep
                name2.value = data.nome
                email2.value = data.email
                tel2.value = data.tel
                CEP2.value= data.cep
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
        localStorage.removeItem('userId')
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
    const changeCred= document.querySelector(".change-cred")
    const changePass= document.querySelector(".change-pass")

    verInfo.addEventListener("click", function(){
        const lista=document.querySelector(".listaProdutos")
        lista.style.visibility="hidden"
        infogeral.style.visibility="visible"
        changePass.style.visibility="hidden"
        changeCred.style.visibility="hidden"
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
        changeCred.style.visibility="hidden"
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
    function aplicarEstilopadrao(input){
        input.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.8)";
        input.style.border = "1px solid var(--sombra-branca)";
    }
    function aplicarEstiloerro(input){
        input.style.boxShadow = "none";
        input.style.border = "1px solid red";
    }
    
    mudarSenha.addEventListener("click", function(){
        infogeral.style.visibility="hidden"
        list.style.visibility="hidden"
        changePass.style.visibility="visible"
        title.textContent="Mude sua senha"
        changeCred.style.visibility="hidden"

    })
    const inputSenhaatual = document.getElementById("senha-atual")
    const newPass = document.getElementById("nova-senha")
    const confimationPass = document.getElementById("confirm-new-pass")
    const olho1 = document.getElementById("olho1")
    const olho2 = document.getElementById("olho2")
    const olho3 = document.getElementById("olho3")
    const icon1 = olho1?.querySelector("i")
    const icon2 = olho2?.querySelector("i")
    const icon3 = olho3?.querySelector("i")

    if (olho1){
        olho1.addEventListener("click", function(){
            if (inputSenhaatual.type === "password"){
                inputSenhaatual.type = "text"
                if (icon1) icon1.className = "fas fa-eye-slash"
            } else {
                inputSenhaatual.type = "password"
                if (icon1) icon1.className = "fas fa-eye"
            }
        })
    }
    if (olho2){
        olho2.addEventListener("click", function(){
            if (newPass.type === "password"){
                newPass.type = "text"
                if (icon2) icon2.className = "fas fa-eye-slash"
            } else {
                newPass.type = "password"
                if (icon2) icon2.className = "fas fa-eye"
            }
        })
    }
    if (olho3){
        olho3.addEventListener("click", function(){
            if (confimationPass.type === "password"){
                confimationPass.type = "text"
                if (icon3) icon3.className = "fas fa-eye-slash"
            } else {
                confimationPass.type = "password"
                if (icon3) icon3.className = "fas fa-eye"
            }
        })
    }

    const mudSenha=document.querySelector(".mud-senha")
    mudSenha.addEventListener("click", function(){
        const senhaAtual= inputSenhaatual.value  
        
        const erro1 = document.getElementById("erro1")
        const erro2 = document.getElementById("erro2")
        const erro3 = document.getElementById("erro3")
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
                        document.getElementById("senha-atual").value = "";
                        document.getElementById("nova-senha").value = "";
                        document.getElementById("confirm-new-pass").value = "";
                        
                        const overlay3 = document.querySelector(".overlay3")
                        overlay3.style.display = "flex"
                        const vlt3 = document.querySelector(".vlt3")
                        vlt3.addEventListener("click", function(){
                            overlay3.style.display = "none"
                        })






                    }
                })
            }

        })
    })
    const mudarCred= document.getElementById("mudarDados")
    mudarCred.addEventListener("click", function(){
        changeCred.style.visibility="visible"
        infogeral.style.visibility = "hidden"
        changePass.style.visibility="hidden"
        list.style.visibility = "hiddeen"
        title.textContent = "Mude suas infomações"

        getCredentials()
    })
    function salvarInfo(){
        const inputNome= document.getElementById("name2")
        const inputNumero = document.getElementById("telefone2")
        const inputEmail = document.getElementById("email2")
        const inputEndereco= document.getElementById("cep2")
        const regexCEP =/^[0-9]{5}-?[0-9]{3}$/
        const regexCelular = /^\(?[1-9]{2}\)? ?9[0-9]{4}-?[0-9]{4}$/
        const regex = /\S+@\S+\.\S+/

        const nome = inputNome.value
        const numero = inputNumero.value
        const endereco = inputEndereco.value
        const email= inputEmail.value
        const validName = nome.trim()
        const validAddress = endereco.trim()

        const errName = document.getElementById("erro-nome")
        const errMail = document.getElementById("erro-email")
        const errNumber = document.getElementById("erro-tel")
        const errCep = document.getElementById("erro-cep")





        let hasName = validName.length > 0
        errName.style.visibility = hasName ? "hidden" : "visible"
        inputNome.style.border = hasName ? "none" : "1px solid #E11D48"

        let hasEmail = regex.test(email)
        errMail.style.visibility = hasEmail ? "hidden" : "visible"
        inputEmail.style.border = hasEmail ? "none" : "1px solid #E11D48"

        let hasNumber = regexCelular.test(numero)
        errNumber.style.visibility = hasNumber ? "hidden" : "visible"
        inputNumero.style.border = hasNumber ? "none" : "1px solid #E11D48"

        let hasAddress = regexCEP.test(validAddress)
        errCep.style.visibility = hasAddress ? "hidden" : "visible"
        inputEndereco.style.border = hasAddress ? "none" : "1px solid #E11D48"
        
        
        let canComplete = hasName && hasNumber && hasAddress && hasEmail

        if (canComplete) {
            fetch('http://127.0.0.1:5000/atualizarCredenciais', {
                method : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    name: validName,
                    email: email,
                    tel:numero,
                    cep:validAddress
                })
            })
            .then(response=> response.json())
            .then(data=>{
                if (data.mensagem === "Informações atualizadas"){
                    alert("deu certo!")
                } else if (data.mensagem === "Erro no banco de dados") {
                    alert("Erro em nosso banco de dados, tente novamente mais tarde!")
                }
            })
        }















        }
}

// SENHA DE TESTE =abc123abc id =13 
/*
if (validName.length > 0) {
            hasName = true
        } else{
            const err = document.getElementById("erro-nome")
            err.style.display = "block"
        } if (regex.test(email)){
            hasEmail = true
        }else{
            const err = document.getElementById("erro-email")
            err.style.display = "block"
        }
        if (regexCelular.test(numero)) {
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
*/