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
        faturamento.textContent = data.faturamento
        const vendasDia = document.getElementById('quantidade-vendas-dia')
        vendasDia.textContent = data.vendasDia
        const ultimaVenda = document.getElementById('ultima-venda')
        ultimaVenda.textContent = data.ultima_venda
    })
}
if (userId && userId !==""){
    verifyIdentity()
    pegarInfomações()
}