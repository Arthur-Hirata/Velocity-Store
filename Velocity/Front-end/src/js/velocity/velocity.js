$(document).ready(function(){
     

})
const lista = document.querySelector(".lista");
const carrinho = document.querySelector(".compras");
const icon = document.getElementById("carrinho");


carrinho.addEventListener("click", function() {
    if (lista.style.display === "none" || lista.style.display === "") {
        icon.className = "fa-solid fa-x";
        lista.style.display = "block";
    } else {
        icon.className = "fa-solid fa-cart-shopping";
        lista.style.display = "none";
    }
});
const btnadc = document.querySelectorAll(".btn-adicionar");

btnadc.forEach(btn => {
    btn.addEventListener('click', () => { //USEI IA AQUI
       
        const idProduto = btn.dataset.id; 
        console.log("Clicou no ID:", idProduto);
        
        fetch("http://127.0.0.1:5000/adicionar", { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: idProduto})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta:", data);
            alert("Item adicionado ao backend"); 
            mostrarCarrinho()
        })
        .catch(err => console.error("Erro no fetch:", err));
    }); 
});


    

    


function mostrarCarrinho(){ 
    fetch("http://127.0.0.1:5000/mostrar") 
    .then(resposta => resposta.json())  
    .then(listaDeProdutos => {                   
       lista.innerHTML = ""
       listaDeProdutos.forEach(produto => {
        const li = document.createElement("li")
        li.textContent = `${produto.nome} - R$ ${produto.preco}`;
        lista.appendChild(li)
       })
    })
    .catch(erro => console.error("Erro ao buscar:", erro)); 
}

   
    







