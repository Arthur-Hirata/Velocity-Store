import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
app= Flask(__name__)
CORS(app)

@app.route('/criarUser', methods = ['POST'])
def adc_User():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')
    senha_hash = generate_password_hash(senha)
    with sqlite3.connect("banco-users.db") as conexao:
        cursor= conexao.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, senha_hash))
        conexao.commit()
        user_id = cursor.lastrowid
    return jsonify({"mensagem": "Usuário recebido!", "id": user_id})
@app.route('/loginUser', methods=['POST'])
def loginUser():
    dados = request.json
    email= dados.get('email')
    senha = dados.get('senha')
    with sqlite3.connect("banco-users.db") as conexao:
        cursor= conexao.cursor()
        cursor.execute("SELECT id, password FROM users WHERE email=?", (email,))
        resultado = cursor.fetchone()
    if resultado is None:
        return jsonify({"mensagem" : "Erro, usuário não encontrado"}), 404

    user_id, password_banco=resultado

    if check_password_hash(password_banco, senha):
         return jsonify({"mensagem": "Login bem sucedido!", "id": user_id}), 200
    else:
        return jsonify({"mensagem": "Senha incorreta"}), 401

@app.route('/credenciais', methods = ['POST'])
def FinalizarCredenciais():
    dados = request.json
    id = dados.get("id")
    nome = dados.get("nome")
    numero = dados.get("numero")
    address = dados.get("address")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("UPDATE users SET nome=?, numero=?, address=? WHERE id=?", (nome, numero, address, id))
        conexao.commit()
    return jsonify({"mensagem" : "Credenciais finalizadas"})


@app.route('/getCredentials', methods=['POST'])
def pegarCredenciais():
    dados = request.json
    id=dados.get("id_user")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT nome, buylist FROM users WHERE id=?", (id,))
        resultado = cursor.fetchone()
    
    user_name, user_list = resultado
    return jsonify({"nome" : user_name, "buylist" : user_list})


@app.route('/getInfo', methods= ['POST'])
def pegarInfo():
    dados= request.json
    id_user = dados.get("userId")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT nome, email, numero, address FROM users WHERE id=?", (id_user,))
        result = cursor.fetchone()
    user_name, user_email, user_num, user_cep = result

    return jsonify({"nome": user_name, "email" : user_email,"tel" : user_num, "cep": user_cep})

@app.route('/ConfirmPassword', methods=['POST'])
def confirPass():
    dados= request.json
    id_user=dados.get("userId")
    senhaAtual= dados.get("senhaAtual")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT password FROM users WHERE id=?", (id_user,))
        result=cursor.fetchone()
    if result:
        senha_hash_banco = result[0]
        if check_password_hash(senha_hash_banco, senhaAtual):
            return jsonify ({"mensagem": "A senha está correta"}), 200
    return jsonify ({"mensagem" : "A senha está incorreta"}), 401

@app.route('/deleteAcc', methods=['DELETE'])
def deleteAcc():
    dados = request.json
    id_user= dados.get("userId")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor=conexao.cursor()
        cursor.execute("DELETE FROM users WHERE id=?", (id_user,))
        conexao.commit()
    return jsonify({"mensagem":"Conta deletada com sucesso"})





if __name__ == '__main__':
    app.run(debug=True)
    