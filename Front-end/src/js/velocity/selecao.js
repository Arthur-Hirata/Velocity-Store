$(document).ready(function(){
})
const pesquisa = document.querySelector(".busca")
const erros = document.querySelector(".erros")
const erros2 = document.querySelector(".erros2")
const botoesHardware = document.querySelectorAll('#btns-hardware > .btn-selecionar');
const botoesPefifericos = document.querySelectorAll('#btns-perifericos > .btn-selecionar')
const notFound = document.querySelector(".nao-encontrado")
const notFound2 = document.getElementById("nao-encontrado-perifericos")



function mudarAparenciaHadware(){
    botoesHardware.forEach(botao=> botao.className = "nao-clicado")
    this.className = "clicado"
    
}
botoesHardware.forEach(btn =>{
    btn.addEventListener("click", mudarAparenciaHadware)
})
function mudarAparenciaPerifericos(){
    botoesPefifericos.forEach(botao=> botao.className = "nao-clicado")
    this.className = "clicado"
}
botoesPefifericos.forEach(btn =>{
    btn.addEventListener("click", mudarAparenciaPerifericos)
})




function tudo(){
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item =>{
        item.style.visibility = "visible"
        item.style.display = "flex"
        erros.style.display = "none"
        pesquisa.value =""
    })
}
function ram(){
    let visiveis = 0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item =>{
        let ram = item.querySelector(".ram") !== null;
        if (ram){
            item.style.visibility = "visible"
            item.style.display = "flex"
            visiveis++
        } else{
            item.style.display = "none" 
        }       
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos Memórias Ram em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function cpu(){
    let visiveis = 0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item => {
        let cpu = item.querySelector(".cpu") !== null;
        if (cpu){
            item.style.visibility = "visible"
            item.style.display = "flex"
            visiveis++        
        }else {
            item.style.display = "none"   
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos processadores em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function gpu(){
    let visiveis = 0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item => {
        let gpu = item.querySelector('.gpu') !== null
        if (gpu){
            item.style.visibility = "visible"
            item.style.display = "flex"
            visiveis++
        } else {
            item.style.display = "none"
        }
    
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos Placas de Vídeo em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function arm(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item =>{
        let arm = item.querySelector(".arm") !== null
        if (arm){
            item.style.visibility = "visible"
            item.style.display = "flex"
            visiveis++
        } else{
            item.style.display = "none"
            
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos Armazenamentos em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function mth(){
    let visiveis = 0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item =>{
        let mth = item.querySelector(".mth") !== null
        if (mth){
            item.style.visibility = "visible"
            item.style.display = "flex"
            visiveis++
        } else{
            item.style.display = "none"
            
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos Placas Mãe em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function gab(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.hardware > li.promocao")
    itens.forEach(item =>{
        let gab = item.querySelector(".gab") !==null
        if (gab){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros.style.visibility = "visible"
        notFound.textContent = "Desculpe, não temos Gabinetes em nossos estoques"
    } else {
        erros.style.visibility = "hidden"
    }
}
function todosPerifecos(){
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        item.style.visibility = "visible"
        item.style.display = "flex"
        erros2.style.display = "none"
        pesquisa.value =""
    })
}
function mouse(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        let mouse = item.querySelector(".mouse") !==null
        if (mouse){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros2.style.visibility = "visible"
        notFound2.textContent="Desculpe, não temos mouses em nosso estoques."
    } else {
        erros2.style.visibility = "hidden"
    }
}
function teclado(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        let teclado = item.querySelector(".teclado") !==null
        if (teclado){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros2.style.visibility = "visible"
        notFound2.textContent="Desculpe, não temos teclados em nosso estoques."
    } else {
        erros2.style.visibility = "hidden"
    }
}
function mousepad(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        let mousepad = item.querySelector(".mousepad") !==null
        if (mousepad){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros2.style.visibility = "visible"
        notFound2.textContent="Desculpe, não temos mousepad em nosso estoques."
    } else {
        erros2.style.visibility = "hidden"
    }
}
function headset(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        let headseat = item.querySelector(".headset") !==null
        if (headseat){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros2.style.visibility = "visible"
        notFound2.textContent="Desculpe, não temos headsets em nosso estoques."
    } else {
        erros2.style.visibility = "hidden"
    }
}
function monitor(){
    let visiveis =0
    const itens = document.querySelectorAll("ul.perifericos > li.promocao")
    itens.forEach(item =>{
        let monitores = item.querySelector(".monitor") !==null
        if (monitores){
            item.style.visibility= "visible"
            item.style.display= "flex"
            visiveis++
            
        } else {
            item.style.display= "none"
        }
    })
    if (visiveis === 0 ){
        pesquisa.value = ""
        erros2.style.visibility = "visible"
        notFound2.textContent="Desculpe, não temos monitores em nosso estoques."
    } else {
        erros2.style.visibility = "hidden"
    }
}



function buscarProduto(){
    const pesquisa = document.querySelector(".busca").value.toLowerCase()
    const itens = document.querySelectorAll("ul.hardware .promocao")
    erros.style.display = "flex"
    let hasMatch = false
    // USEI IA NESSA PARTE
    for (let a = 0; a <itens.length; a++ ){
        let subTexto = itens[a].querySelector(".nome-produto")
    
        if (subTexto){
            let conteudo = subTexto.textContent || subTexto.innerText;
            
            if (conteudo.toLowerCase().indexOf(pesquisa)> -1 ){
                itens[a].style.visibility = "visible"
                itens[a].style.display = "flex"
                hasMatch = true
                erros.style.visibility="hidden"
            } else {
                itens[a].style.display = "none"
            }
        }
    }
    if (!hasMatch && pesquisa.length > 0){
        const mensagem = `Desculpe não encontramos "${pesquisa}" em nosso estoque!`
        notFound.textContent = mensagem
        erros.style.visibility="visible"
    }
}
function apagarBusca(){
    const pesquisa = document.querySelector(".busca")
    pesquisa.value=""
    erros.style.visibility="hidden"
    buscarProduto()
}
function buscarPerifericos(){
    const pesquisa = document.getElementById("busca-perifericos").value.toLowerCase()
    const erros2 = document.querySelector(".erros2")
    const itens = document.querySelectorAll("ul.perifericos .promocao")
    erros2.style.display = "flex"
    let hasMatch = false
    for (let a = 0; a <itens.length; a++ ){
        let subTexto = itens[a].querySelector(".nome-produto")
    
        if (subTexto){
            let conteudo = subTexto.textContent || subTexto.innerText;
            
            if (conteudo.toLowerCase().indexOf(pesquisa)> -1 ){
                itens[a].style.visibility = "visible"
                itens[a].style.display = "flex"
                erros2.style.visibility="hidden"
                hasMatch = true
            } else {
                itens[a].style.display = "none"
            }
        }
    }
    if (!hasMatch && pesquisa.length > 0){
        const mensagem = `Desculpe não encontramos "${pesquisa}" em nosso estoque!`
        notFound2.textContent = mensagem
        erros2.style.visibility="visible"
    }
}
function apagarBuscaPerifericos(){
    const pesquisa = document.getElementById("busca-perifericos")
    pesquisa.value=""
    erros2.style.visibility="hidden"
    buscarProduto()
    todosPerifecos()
}