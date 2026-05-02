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
    return jsonify({"mensagem": "Usuário recebido!"})
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
    nome = dados.get("nome")
    numero = dados.get("numero")
    address = dados.get("address")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("INSERT INTO users (nome, numero, address) VALUES (?,?,?)", (nome,numero,address))
        conexao.commit()
    return jsonify({"mensagem" : "Credenciais finalizadas"})



if __name__ == '__main__':
    app.run(debug=True)
    