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
function clientes(){
    fetch('http://127.0.0.1:5000/getUsers',{
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data=>{
        const tabela = document.getElementById("tabela-users")
        data.user.forEach(user =>{
            const tr = document.createElement("tr")
            let lista = typeof user.lista === 'string' ? JSON.parse(user.lista) : user.lista
            if (Array.isArray(lista) && lista.length ===0){
                lista = "null"
            }
            tr.innerHTML= `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.numero}</td>
                <td>${lista}</td>`
            tabela.appendChild(tr)
        })
    })  .catch(err => console.error('Erro ao carregar usuários:', err));
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
if (userId && userId !==""){
    verifyIdentity()
    pegarInfomações()
    clientes()
}