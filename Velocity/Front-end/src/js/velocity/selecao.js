$(document).ready(function(){
})

const botoes = document.querySelectorAll('.btn-selecionar');
botoes.forEach(botao => {
    botao.addEventListener("click", function(){
        botoes.forEach(b => b.className = "nao-clicado" )
        this.className = "clicado"
    })
})

const itens = document.querySelectorAll("ul.hardware > li.promocao")
function tudo(){
    itens.forEach(item =>{
        item.style.visibility = "visible"
    })
}
function ram(){
    itens.forEach(item =>{
        let ram = item.querySelector(".ram") !== null;
        if (ram){
            item.style.visibility = "visible"
        } else{
            item.style.visibility = "hidden"
        }
    })
}
function gpu(){
    itens.forEach(item => {
        let gpu = item.querySelector('.gpu') !== null
        if (gpu){
            item.style.visibility = "visible"
        } else {
            item.style.visibility = "hidden"
        }
    
    })
}
