$(document).ready(function(){
})
const lista = document.querySelector(".lista");
const carrinho = document.querySelector(".compras");
const icon = document.getElementById("carrinho");
const listaCompras = document.querySelector(".lista-compras")
const btnMap = new Map(); // ISSO AQUI EU NAO SABIA USEI A IA PRA FAZER
const userId = localStorage.getItem('userId')

window.addEventListener('load', function () {
    getCredentials();
});

function getCredentials(){
    fetch('http://127.0.0.1:5000/getCredentials', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_user: userId
        })}
    )
    .then(response => response.json())
    .then(data => {
        if (data.mensagem === "usuário encontrado"){
            if (data.nome){
                const loginText = document.querySelector(".login")
                loginText.textContent = data.nome
            }
            if (data.role === "admin"){
                createAdimn();
            }
            isLogged()
        }
        else if (data.mensagem ==="usuário não encontrado"){
            naoLoggado()
        }
    })
.catch(err => console.error("Erro no fetch:", err));
}
const login=document.querySelector(".red-log")
login.addEventListener("click", function(){
    window.location.href = "acc.html"
})

function createAdimn(){
    if (document.querySelector(".admin-button")) return;

    const bntAdmin = document.createElement("button")
    bntAdmin.className = "admin-button"
    bntAdmin.textContent = "Admin"
    const navaux = document.querySelector(".aux")
    navaux.appendChild(bntAdmin)
    bntAdmin.onclick= () => window.location.href = "admin.html";
}
function isLogged(){
    const notlogged = document.querySelector(".not-logged")
    notlogged.style.display ="none"
function calcularPrecoFinal(preco_final){
    if (!preco_final){
        return
    }
    const precoFinalElement = document.querySelector('.preco-final');
    const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco_final);
    precoFinalElement.innerHTML = `Preço Final <br> ${precoFormatado}`;
}
carrinho.addEventListener("click", function() {
        if (lista.style.display === "none" || lista.style.display === "") {
            icon.className = "fa-solid fa-x";
            lista.style.display = "flex";
            mostrarCarrinho();
        } else {
            icon.className = "fa-solid fa-cart-shopping";
            lista.style.display = "none";
        }
});
const btnAdicionar = document.querySelectorAll(".btn-adicionar")
const remover = document.querySelector(".apagar-lista")
btnAdicionar.forEach(btn=>{
    btn.addEventListener("click", function(){
        const itemID = btn.dataset.id
        const card = btn.closest(".promocao")
        btn.textContent=""
        btn.style.backgroundColor ="green"
        const i = document.createElement("i")
        i.className = "fas fa-check-circle"
        btn.append(i)
        let quantidade = 1
        fetch("http://127.0.0.1:5000/adicionar", {
            method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: itemID,
                    id_user: userId,
                    quantidade: quantidade
                })
        })
        .then(response=> response.json())
        .then(data=>{
            mostrarCarrinho()
        })
    })
})
remover.addEventListener("click", function(){
    fetch("http://127.0.0.1:5000/apagar", {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
               id_user: userId   
           })
    })
    .then(response => response.json())
    .then(data =>{
        mostrarCarrinho()
        const precoFinalElement = document.querySelector('.preco-final');
        precoFinalElement.innerHTML=`Preço Final <br> R$0,00`
    })
    .catch(err => console.error("Erro ao limpar:", err));
})
function mostrarCarrinho(){
    fetch("http://127.0.0.1:5000/mostrar",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                    id_user: userId   
        })
    })
    .then(response=> response.json())
    .then(data => {
        listaCompras.innerHTML=""
        calcularPrecoFinal(data.preco_final)
        data.produtos.forEach(produto =>{
            const li = document.createElement("li")
            const foto =document.createElement("img")
            const produtoNome = document.createElement("span")
            const spanQuantidade=document.createElement("span");
            const produtoPreco = document.createElement("span")
            const divBtns = document.createElement("div")
            const aumentarQnt = document.createElement("button")
            const removerQnt = document.createElement("button")
            li.className ="item-lista"
            foto.src = produto.imagem;
            foto.className = "foto-lista"
            produtoNome.className = "nome-item"
            produtoNome.textContent = `${produto.nome}`
            spanQuantidade.className = "quantidade";
            spanQuantidade.textContent = produto.quantidade
            const precoUnitario = `${produto.preco}`
            produtoPreco.textContent = precoProdutoFinal
            produtoPreco.className = "preco-produto"
            var precoProdutoFinal = `${produto.preco}`;
            aumentarQnt.type = "button"
            aumentarQnt.className = "btn-aumentar"
            aumentarQnt.textContent = "+"
            removerQnt.type = "button"
            removerQnt.className = "btn-remover"
            removerQnt.textContent = "X"
            divBtns.className = "div-btns"
            divBtns.appendChild(aumentarQnt)
            divBtns.append(spanQuantidade)
            divBtns.appendChild(removerQnt)

            aumentarQnt.addEventListener("click", function(){
                fetch("http://127.0.0.1:5000/atualizar/"+ produto.id,{
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: produto.id,
                        quantidade: produto.quantidade + 1,
                        user_id: userId
                    })
                })
                .then(response => response.json())
                .then(data=>{
                    mostrarCarrinho()
                })
                .catch(err => console.error("Erro no fetch:", err));
            })
            removerQnt.addEventListener("click", function(){
                if (produto.quantidade > 1) {
                    fetch("http://127.0.0.1:5000/diminuir/" + produto.id,{
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            quantidade: produto.quantidade - 1,
                            user_Id: userId
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log("Resposta:", data); 
                    mostrarCarrinho();
                    })
                    .catch(err => console.error("Erro no fetch:", err));
                } else {
                    fetch(`http://127.0.0.1:5000/remover/${produto.id}` ,{
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_Id: userId
                        })
                    })
                    .then(response => response.json())
                    .then (data => {
                        if (data.status === "removido") {
                            listaCompras.removeChild(li);
                            const btnAdicionar = btnMap.get(produto.id);
                            if (btnAdicionar) {
                                const carrinho = document.createElement("i")
                                carrinho.className = "fa-solid fa-cart-shopping"
                                carrinho.style.marginLeft = "4px"
                                btnAdicionar.style.backgroundColor = "#F59E0B";
                                btnAdicionar.textContent = "Carrnho";
                                btnAdicionar.append(carrinho)
                            }
                            mostrarCarrinho()
                            if (listaCompras.children.length == 0){
                                
                                remover.style.visibility="hidden"
                            } else{
                                atualizarPrecoFinal(data.preco_final)
                                
                            }
                        } else {
                            
                        }
                    })
                    .catch(erro => console.error("Erro na requisição:", erro));

                }
            })
            li.appendChild(foto)
            li.appendChild(produtoPreco)
            li.appendChild(produtoNome)
            li.appendChild(divBtns)
            li.style.display= "flex"
            li.style.FlexDirection= "column"
            li.style.border = "1px solid rgba(255, 255, 255, 0.8)"
            listaCompras.appendChild(li)
        })
        if (listaCompras.children.length >0 ){
             remover.style.visibility = 'visible'
        }else {
            remover.style.visibility = 'hidden'
            const precoFinalElement = document.querySelector('.preco-final');
            precoFinalElement.innerHTML=`Preço Final <br> R$0,00`
        }
    })
    .catch(erro => console.error("Erro ao buscar:", erro));
}
document.querySelector(".btn-finalizar").addEventListener("click", function(){
    if (listaCompras.children.length > 0){
        fetch('http://127.0.0.1:5000/pegarListaFinal',{
                method : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId
                })
            })
            .then(response=> response.json())
            .then( data=>{
                if (data.mensagem === "deu certo"){
                    listaCompras.innerHTML = ""
                    const prefinal = document.querySelector(".preco-final")
                    prefinal.innerHTML="Preço Final <br> R$ 0,00"
                    const sucess = document.querySelector(".overlay")
                    sucess.style.display ="flex"
                    lista.style.display = 'none'
                    const bntVoltar = document.querySelector(".vlt")
                    bntVoltar.addEventListener("click", function(){
                        sucess.style.display = "none"
                    })
                }
            })
            .catch(error => {
                console.error("Erro ao conectar com a API:", error);
            });}
            else {
                const fail = document.querySelector(".overlay2")
                fail.style.display = "flex"
                lista.style.display = 'none'
                const btnVlt2 = document.querySelector(".vlt2")
                btnVlt2.addEventListener("click", function(){
                fail.style.display = 'none'
        })
    }
})
} 
function naoLoggado(){
    const login= document.querySelector(".red-log")
    login.addEventListener("click", function(){
        window.location.href = "login.html"
    })
    console.log("Você não esta logado")
    function mostrarCarrinho(){
        const divCompras = document.querySelector(".lista")
        divCompras.style.display = "block"
        const divLista = document.querySelector(".lista-compras")
        divLista.style.display = "block"
        const finalList = document.querySelector(".final-lista")
        finalList.style.display = "none"
        const btnLogin2 = document.querySelector(".login2")
        btnLogin2.style.height = "80px"
        divCompras.style.height = "400px"
        divCompras.style.display= "none"
        carrinho.addEventListener("click", function() {
            if (lista.style.display === "none" || lista.style.display === "") {
                icon.className = "fa-solid fa-x";
                carrinho.style.rigth = "100px"
                lista.style.display = "flex";
                lista.style.FlexDirection = "row"
            } else {
                icon.className = "fa-solid fa-cart-shopping";
                lista.style.display = "none";
            }
        })
        const erradc = document.querySelectorAll(".btn-adicionar")
        const divErro = document.querySelector(".err")
        const bntsair = document.querySelector(".sair")
        erradc.forEach(btn =>{
            btn.addEventListener("click", function(){
                divErro.style.visibility = "visible"
                document.body.classList.add("blurred")
            })
        })
        bntsair.addEventListener("click", function(){
            divErro.style.visibility = "hidden"
            document.body.classList.remove("blurred")
        })
    }
    mostrarCarrinho()
}
 /* IDEIAS 
 Gráfico de Crescimento : se a biblioteca JavaScript Chart.js (é super simples) para transformar a quantidade de usuários e produtos em um gráfico de barras ou pizza visualmente bonito.
 Logs de Atividade: Uma tabela simples que mostra as últimas ações do sistema. Exemplo: "Admin XPTO cadastrou o produto Y às 14:00".        
 Exportar Dados: Um botão que baixa a lista de usuários ou produtos em um arquivo .csv (Excel).*/