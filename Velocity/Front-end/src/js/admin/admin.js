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
if (userId && userId !==""){
    verifyIdentity()
}