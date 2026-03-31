$(document).ready(function(){
})
const lista = document.querySelector(".lista");
const carrinho = document.querySelector(".compras");
const icon = document.getElementById("carrinho");
const listaCompras = document.querySelector(".lista-compras")

function atualizarPrecoFinal() {
    fetch('http://127.0.0.1:5000/precofinal')
    .then(response => response.json())
    .then(data => {
        const precoFinalElement = document.querySelector('.preco-final');
        const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.preco_final);
        precoFinalElement.innerHTML = `Preço Final <br> ${precoFormatado}`;
    })
    .catch(err => console.error('Erro ao buscar preço final:', err));
}
const remover = document.querySelector(".remover")
carrinho.addEventListener("click", function() {
    if (lista.style.display === "none" || lista.style.display === "") {
        icon.className = "fa-solid fa-x";
        carrinho.style.rigth = "100px"
        lista.style.display = "flex";
        lista.style.FlexDirection = "row"
        mostrarCarrinho();
        atualizarPrecoFinal();
    } else {
        icon.className = "fa-solid fa-cart-shopping";
        lista.style.display = "none";
    }
});
const btnadc = document.querySelectorAll(".btn-adicionar");
btnadc.forEach(btn => {
    btn.addEventListener('click', () => { //USEI IA AQUI
        const idProduto = btn.dataset.id;
        const card = btn.closest('.promocao')
        const imagemElemento = card.querySelector(".foto-produto").src
        let quantidade = 1;
        fetch("http://127.0.0.1:5000/adicionar", { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: idProduto,
                imagem : imagemElemento,
                quantidade: quantidade
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta:", data);
            mostrarCarrinho();
            atualizarPrecoFinal();
        })
        .catch(err => console.error("Erro no fetch:", err));
    }); 
});

remover.addEventListener('click', function(){
    fetch ("http://127.0.0.1:5000/apagar", {
        method: 'DELETE'
    })
    .then(response => response.json)
    .then(data =>{
        mostrarCarrinho();
        atualizarPrecoFinal()
    })
    .catch(err => console.error("Erro ao limpar:", err));
})
function mostrarCarrinho(){ 
    fetch("http://127.0.0.1:5000/mostrar") 
    .then(resposta => resposta.json())  
    .then(listaDeProdutos => {                   
       listaCompras.innerHTML = ""
       listaDeProdutos.forEach(produto => {
        const li = document.createElement("li")
        li.className = "item-lista"
        const spanQuantidade = document.createElement("span")
        spanQuantidade.textContent = produto.quantidade;
        spanQuantidade.className = "quantidade";
        const produtoNome = document.createElement("span")
        produtoNome.textContent = `${produto.nome}`
        produtoNome.className = "nome-item"
        const produtoPreco = document.createElement("span")
        const precoUnitario = `${produto.preco}`
        var precoProdutoFinal = `${produto.preco}`;
        produtoPreco.textContent = precoProdutoFinal
        produtoPreco.className = "preco-produto"
        const aumentarQnt = document.createElement("button")
        aumentarQnt.className = "btn-aumentar"
        aumentarQnt.textContent = "+"
        const removerQnt = document.createElement("button")
        removerQnt.className = "btn-remover"
        removerQnt.textContent = "X"
        const divBtns = document.createElement("div")
        divBtns.className = "div-btns"
        divBtns.appendChild(aumentarQnt)
        divBtns.append(spanQuantidade)
        divBtns.appendChild(removerQnt)
        const foto =document.createElement("img")
        foto.src = produto.imagem;
        foto.className = "foto-lista"
        aumentarQnt.addEventListener("click", function(){
            fetch("http://127.0.0.1:5000/atualizar/" + produto.id,{
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: produto.id,
                    quantidade: produto.quantidade + 1
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Resposta:", data); 
                mostrarCarrinho();
                atualizarPrecoFinal();
            })
            .catch(err => console.error("Erro no fetch:", err));
        })
        removerQnt.addEventListener("click", function(){
            if (produto.quantidade > 1){
                fetch("http://127.0.0.1:5000/diminuir/" + produto.id,{
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: produto.id,
                        quantidade: produto.quantidade - 1
                    })
                })
                .then(response => response.json())
            .then(data => {
                console.log("Resposta:", data); 
                mostrarCarrinho();
                atualizarPrecoFinal();
            })
            .catch(err => console.error("Erro no fetch:", err));
            } else {
                fetch(`http://127.0.0.1:5000/remover/${produto.id}` ,{
                    method: 'DELETE'
                })
                .then (resposta => {
                    if (resposta.ok) {
                        listaCompras.removeChild(li);
                        atualizarPrecoFinal();
                    } else {
                        console.log("deu erro burrao")
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
       if (listaCompras.children.length > 0){
            remover.style.visibility = 'visible'
            
        }
        else {
            remover.style.visibility = 'hidden'
        }
    })
    .catch(erro => console.error("Erro ao buscar:", erro)); 
}