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
const overlay2 = document.querySelector(".overlay2")
const alertText = document.querySelector(".subalert")
const btnSim = document.querySelector(".sim")
const btnNao = document.querySelector(".nao")
let confirmarAcao = null
btnSim.onclick = function(){
    if (typeof confirmarAcao === "function"){
        overlay2.style.display= "none"
        confirmarAcao()
    }
}
btnNao.onclick = function() {
    overlay2.style.display = "none";
    confirmarAcao = null; 
};
function apagarUser(btn){
    const line = btn.closest("tr")
    const apagarId = line.querySelector(".user-id").innerText
    const nomeUser = line.querySelector(".username").innerText
    overlay2.style.display = "flex"
    alertText.textContent = "Você tem certeza que deseja excluir o usuário " + nomeUser + "?" 
    confirmarAcao = function(){
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
    };
}

function itens(){
    fetch('http://127.0.0.1:5000/pegarItens', {
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data=>{
        const tabelaItens = document.getElementById("tabela-itens")
        tabelaItens.innerHTML=""
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
const erroEditar = document.getElementById("erro-editar")


const btnCancelar1 = document.getElementById("cancelarEditar")
const inputItemId = document.getElementById("item-id")
const inputNomeItem =  document.getElementById("nome-item")
const inputPrecoItem = document.getElementById("preco-item")

btnCancelar1.addEventListener("click", function(){
    inputItemId.value=""
    inputNomeItem.value=""
    inputPrecoItem.value=""
})

function editarItem(){
    const itemId =inputItemId.value
    const nomeItem = inputNomeItem.value
    const precoItem=inputPrecoItem.value
    inputItemId.style.border=""
    erroEditar.style.display="none"
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
            inputItemId.value=""
            inputNomeItem.value=""
            inputPrecoItem.value=""
            itens();
        } else if (data.mensagem === "Esse item não existe no banco de dados"){
            erroEditar.style.display="block"
            inputItemId.style.border="1px solid #c62828"
            overlay.style.display = "none"
        }
        else {
            alertTitle.textContent = "Erro!"
            alertTitle.style.color = "#c62828"
            alertSub.textContent = "O item não foi atualizado no banco de dados, tente mais tarde."
        }
    }) .catch(err => console.error('Erro ao atualizar item:', err));
}


const btnCancelar2 = document.getElementById("cancelarAdicionar")
const inputNomeItemNovo =document.getElementById("nome-item-novo")
const inputprecoItemNovo = document.getElementById("preco-item-novo")

btnCancelar2.addEventListener("click", function(){
    inputNomeItemNovo.value=""
    inputprecoItemNovo.value= ""
})
function adicionarItem(){
    const nomeItemNovo = inputNomeItemNovo.value
    const precoItemNovo = inputprecoItemNovo.value
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
            inputNomeItemNovo.value=""
            inputprecoItemNovo.value= ""
        }
    }) .catch(err => console.error('Erro ao atualizar item:', err));
}




const btnCancelar3 = document.getElementById("cancelarApagar")
const inputId= document.getElementById("remover-item-id")
const inputConfirmId =document.getElementById("confirmar-remover-item-id")
btnCancelar3.addEventListener("click", function(){
    inputId.value=""
    inputConfirmId.value=""
})
const erro2 = document.getElementById("erro-apagar")
function apagarItem(){
    const itemId= inputId.value
    const confirmItemId= inputConfirmId.value
    erro2.style.display = "none"
    inputId.style.border=""
    inputConfirmId.style.border=""
    if (itemId == confirmItemId){
        overlay2.style.display = "flex"
        alertText.textContent = "Tem certeza que deseja excluir o item ID: " + itemId + "?"
        confirmarAcao = function(){
            fetch('http://127.0.0.1:5000/deletarItem', {
                method : 'DELETE',
                headers:{'Content-Type': 'application/json'},
                body : JSON.stringify({
                    itemId: itemId
                })
            })
            .then (response => response.json())
            .then(data=>{
                overlay2.style.display = "none"
                overlay.style.display = "flex"
                if (data.mensagem === "Item exluido do banco de dados com sucesso"){
                    alertTitle.textContent = "Parabéns"
                    alertTitle.style.color = "#2e7d32"
                    alertSub.textContent = "Você Exluiu o item com sucesso"
                    inputId.value=""
                    inputConfirmId.value=""
                    itens()
                } else{
                alertTitle.textContent = "Erro!"
                alertTitle.style.color = "#c62828"
                alertSub.textContent = "O item não foi Exluido do banco de dados, tente mais tarde."
                }
            }).catch(err => console.error('Erro ao atualizar item:', err));
        };
    } else{
        inputId.style.border="1px solid #c62828"
        inputConfirmId.style.border="1px solid #c62828"
        erro2.style.display="block"
    }
}

if (userId && userId !==""){
    verifyIdentity()
    pegarInfomações()
    clientes()
    itens()
}