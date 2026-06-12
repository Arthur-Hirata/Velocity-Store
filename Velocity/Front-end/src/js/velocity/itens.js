window.onload = function(){
    getItens()
}
function getItens(){
    fetch("http://127.0.0.1:5000/getItens", {
        method :'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
    .then(data=>{
        const listaHardware = document.querySelector(".hardware")
        const listaPerifericos = document.querySelector(".perifericos")
        listaHardware.innerHTML=""
        listaPerifericos.innerHTML=""
        const hardware=data.Hardwares || []
        const perifericos = data.perifericos || []
        let htmlHardware =""
        let htmlPerifericos=""
        hardware.forEach(item=>{
            htmlHardware +=`
                <li class="promocao">
                    <img class="foto-produto" src="${item.imagem}">
                    <h4 class="price">R$${item.preco}</h4>
                    <span class="${item.componente}"></span>
                    <h3 class="nome-produto">${item.nome}</h3>
                    <button class="btn-adicionar" data-id="${item.id}" type="button">Carrinho <i class="fa-solid fa-cart-shopping"></i></button>   
                </li>`
        })
        perifericos.forEach(item=>{
            htmlPerifericos +=`
                <li class="promocao">
                    <img class="foto-produto" src="${item.imagem}">
                    <h4 class="price">R$${item.preco}</h4>
                    <span class="${item.componente}"></span>
                    <h3 class="nome-produto">${item.nome}</h3>
                    <button class="btn-adicionar" data-id="${item.id}" type="button">Carrinho<i class="fa-solid fa-cart-shopping"></i></button>   
                </li>`
        })
        listaHardware.innerHTML=htmlHardware
        listaPerifericos.innerHTML=htmlPerifericos

    })
     .catch(erro => console.error("Erro na requisição:", erro));
}