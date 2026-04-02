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
        item.style.display = "flex"
    })
}
function ram(){
    itens.forEach(item =>{
        let ram = item.querySelector(".ram") !== null;
        if (ram){
            item.style.visibility = "visible"
            item.style.display = "flex"
        } else{
            item.style.display = "none"
        }
    })
}
function cpu(){
    itens.forEach(item => {
        let cpu = item.querySelector(".cpu") !== null;
        if (cpu){
            item.style.visibility = "visible"
            item.style.display = "flex"
        }else {
            item.style.display = "none"
        }
    })
}
function gpu(){
    itens.forEach(item => {
        let gpu = item.querySelector('.gpu') !== null
        if (gpu){
            item.style.visibility = "visible"
            item.style.display = "flex"
        } else {
            item.style.display = "none"
        }
    
    })
}
function arm(){
    itens.forEach(item =>{
        let arm = item.querySelector(".arm") !== null
        if (arm){
            item.style.visibility = "visible"
            item.style.display = "flex"
        } else{
            item.style.display = "none"
        }
    })
}
function mth(){
    itens.forEach(item =>{
        let mth = item.querySelector(".mth") !== null
        if (mth){
            item.style.visibility = "visible"
            item.style.display = "flex"
        } else{
            item.style.display = "none"
        }
    })
}
function gab(){
    itens.forEach(item =>{
        let gab = item.querySelector(".gab") !==null
        if (gab){
            item.style.visibility= "visible"
            item.style.display= "flex"
        } else {
            item.style.display= "none"
        }
    })
}
