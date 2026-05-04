import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

@app.route('/criarUser', methods = ['POST'])
def adc_User():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')
    with sqlite3.connect("banco-users.db") as conexao:
        cursor= conexao.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, senha))
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

    if senha == password_banco:
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
    id=dados.get("id")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT nome, buylist FROM users WHERE id=?", (id))
        resultado = cursor.fetchone()
    
    user_name, user_list = resultado
    return jsonify({"nome" : user_name, "buylist" : user_list})





if __name__ == '__main__':
    app.run(debug=True)
    