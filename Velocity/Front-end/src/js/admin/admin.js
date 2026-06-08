const userId = localStorage.getItem("userId")
function verifyIdentity(){
    fetch('http://127.0.0.1:5000/getCredentials', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_user : userId
            })
    })
    .then(response => response.json())
    .then(data=>{
        if (data.role !== "admin"){
            const restrict = document.querySelector(".acesso-restrito")
            restrict.style.display = "flex"
        } else {
            const adminName = document.querySelector(".admin-name")
            adminName.textContent = data.nome
        }
    })
    .catch(err => console.error("Erro no fetch:", err));
}
function sair(){
    window.location.href = "Velocity.html"
}
function pegarInfomações(){
    fetch('http://127.0.0.1:5000/verifyQnt', {
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data =>{
        const userQnt = document.getElementById("quantidade-Clientes")
        userQnt.textContent = data.users
        const produtosQnt = document.getElementById("quantidade-produtos")
        produtosQnt.textContent = data.produtos
        const vendasQnt = document.getElementById("quantidade-vendas")
        vendasQnt.textContent = data.vendas
        const faturamento= document.getElementById('faturamento-total')
        faturamento.textContent = "R$" + data.faturamento
        const vendasDia = document.getElementById('quantidade-vendas-dia')
        vendasDia.textContent = data.vendasDia
        const ultimaVenda = document.getElementById('ultima-venda')
        ultimaVenda.textContent = data.ultima_venda
    })
}
function clientes(){
    fetch('http://127.0.0.1:5000/getUsers',{
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data=>{
        var tabela = document.getElementById("tabela-users")
        data.user.forEach(user =>{
            const tr = document.createElement("tr")
            let lista = typeof user.lista === 'string' ? JSON.parse(user.lista) : user.lista
            
            if (Array.isArray(lista) && lista.length ===0){
                lista = "null"
            }
            tr.innerHTML= `
                <td class="user-id">${user.id}</td>
                <td class="username">${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.numero}</td>
                <td>${lista}</td>
                <button class="btn-apagar-user" onclick="apagarUser(this)"><i class="fa-solid fa-trash"></i></button>`
                
            tabela.appendChild(tr)
        })
    })  .catch(err => console.error('Erro ao carregar usuários:', err));
}
function apagarUser(btn){
    const line = btn.closest("tr")
    const apagarId = line.querySelector(".user-id").innerText
    const nomeUser = line.querySelector(".username").innerText
    const overlay2 = document.querySelector(".overlay2")
    overlay2.style.display = "flex"
    const alertText = document.querySelector(".subalert")
    alertText.textContent = "Você tem certeza que deseja excluir o usuário " + nomeUser + "?" 
    const btnSim = document.querySelector(".sim")
    const btnNao = document.querySelector(".nao")
    btnSim.onclick= function(){
        fetch('http://127.0.0.1:5000/apagarUser',{
            method : "DELETE", 
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                idUser : apagarId
            })
        }) .then(response => response.json())
        .then(data=>{
            overlay2.style.display = "none"
            if (data.mensagem === "Usuário excluido com sucesso"){
                overlay.style.display = "flex"
                alertTitle.textContent = "Tarefa concluida!"
                alertTitle.style.color = "#2e7d32"
                alertSub.textContent = "Usuário exluido com sucesso"
                const tabela = document.getElementById("tabela-users")
                if (tabela){
                    tabela.innerHTML=""
                    clientes()
                }
            } else {
                overlay.style.display = "flex"
                alertTitle.textContent = "Erro"
                alertTitle.style.color = "#c62828"
                alertSub.textContent = "Erro no banco de dados, tente novamente mais tarde."
            }
        })
        .catch(err => {
            overlay2.style.display = "none";
            console.error("Erro na requisição:", err);
        });
    }
    btnNao.onclick= function(){
        overlay2.style.display = "none"
    }
}

function itens(){
    fetch('http://127.0.0.1:5000/pegarItens', {
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data=>{
        const tabelaItens = document.getElementById("tabela-itens")
        data.item.forEach(item=>{
            const tr = document.createElement("tr")
            tr.innerHTML=`
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.preco}</td>`
            tabelaItens.appendChild(tr)
        })
    }) .catch(err => console.error('Erro ao carregar usuários:', err));
}
const overlay = document.querySelector(".overlay")
const alertTitle = document.getElementById("alert-title")
const alertSub = document.getElementById("alert-sub")
const bntVoltar = document.querySelector(".voltar")
bntVoltar.addEventListener("click", function(){
    overlay.style.display = "none"
})
function editarItem(){
    const itemId = document.getElementById("item-id").value
    const nomeItem = document.getElementById("nome-item").value
    const precoItem= document.getElementById("preco-item").value

    fetch('http://127.0.0.1:5000/atualizarItem', {
        method : 'PATCH',
        headers :{ 'Content-Type': 'application/json' },
        body : JSON.stringify({
            id : itemId,
            nome : nomeItem,
            preco : precoItem
        })
    }).then (response => response.json())
    .then(data=>{
        overlay.style.display = "flex"
        if (data.mensagem === "Item atualizado com sucesso"){
            alertTitle.textContent = "Parabéns"
            alertTitle.style.color = "#2e7d32"
            alertSub.textContent = "Você atualizou o item com sucesso"
            itemId.value=""
            nomeItem.value=""
            precoItem.value=""
            itens()
        } else {
            alertTitle.textContent = "Erro!"
            alertTitle.style.color = "#c62828"
            alertSub.textContent = "O item não foi atualizado no banco de dados, tente mais tarde."
        }
    }) .catch(err => console.error('Erro ao atualizar item:', err));
}
function adicionarItem(){
    const nomeItemNovo = document.getElementById("nome-item-novo").value
    const precoItemNovo = document.getElementById("preco-item-novo").value
    fetch('http://127.0.0.1:5000/adcItem', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
            nome : nomeItemNovo,
            preco : precoItemNovo
        })
    }).then (response=> response.json())
    .then(data=>{
        overlay.style.display = "flex"
        if (data.mensagem === "Item adcionando com sucesso"){
            alertTitle.textContent = "Parabéns"
            alertTitle.style.color = "#2e7d32"
            alertSub.textContent = "Você adicionou o item com sucesso"
            nomeItemNovo.value=""
            precoItemNovo.value=""
            itens()
        } else {
            alertTitle.textContent = "Erro!"
            alertTitle.style.color = "#c62828"
            alertSub.textContent = "O item não foi adicionado ao banco de dados, tente mais tarde."
        }
    }) .catch(err => console.error('Erro ao atualizar item:', err));
}
if (userId && userId !==""){
    verifyIdentity()
    pegarInfomações()
    clientes()
    itens()
}