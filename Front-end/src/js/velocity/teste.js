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
            atualizarPrecoFinal();
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
        fetch("http://127.0.0.1:5000/", {
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
function apagarLista(){
    fetch("http://127.0.0.1:5000/apagar", {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
               id_user: userId   
           })
    })
    .then(response => response.json())
    .then(data =>{
       mostrarCarrinho();
       atualizarPrecoFinal(0,)
   })
   .catch(err => console.error("Erro ao limpar:", err));
}
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
                    
                })
                .catch(err => console.error("Erro no fetch:", err));
            })
            removerQnt.addEventListener("click", function(){
                if (produto.quantidade > 1) {
                    fetch("http://127.0.0.1:5000/diminuir/" + produto.id,{
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
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
                    .then (resposta => {
                        if (resposta.ok) {
                            listaCompras.removeChild(li);
                            atualizarPrecoFinal(resposta.preco_final);
                            const btnAdicionar = btnMap.get(produto.id);
                            if (btnAdicionar) {
                                const carrinho = document.createElement("i")
                                carrinho.className = "fa-solid fa-cart-shopping"
                                carrinho.style.marginLeft = "4px"
                                btnAdicionar.style.backgroundColor = "#F59E0B";
                                btnAdicionar.textContent = "Carrnho";
                                btnAdicionar.append(carrinho)
                                mostrarCarrinho()
                            }
                        } else {
                            
                        }
                    })
                    .catch(erro => console.error("Erro na requisição:", erro));
                    remover.style.visibility = "hidden"
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
        }
    })
    .catch(erro => console.error("Erro ao buscar:", erro));
}
function finalizarCompra(){
    if (listaCompras.children.length > 0){
        etch('http://127.0.0.1:5000/pegarListaFinal',{
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
}