import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
app= Flask(__name__)
CORS(app)

@app.route('/getCredentials', methods=['POST'])
def pegarCredenciais():
    dados = request.json
    id=dados.get("id_user")
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT nome, buylist, role FROM users WHERE id=?", (id,))
        resultado = cursor.fetchone()
    
    
    if not resultado:
        return jsonify ({"mensagem": "usuário não encontrado"}), 404    

    user_name, user_list, role = resultado

    return jsonify({
        "nome" : user_name,
        "buylist" : user_list,
        "role" : role
    }),200
@app.route('/verifyQnt', methods=['GET'])
def numUsers():
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT COUNT(*) AS total_users FROM users WHERE role='user'")
        result = cursor.fetchone()
    total_users = result[0] if result else 0

    with sqlite3.connect("banco-itens.db") as conex:
        cursor= conex.cursor()
        cursor.execute("SELECT COUNT(*) AS total_produtos FROM itens")
        resultado = cursor.fetchone()
    total_produtos = resultado[0] if resultado else 0
    return jsonify({"users" : total_users, "produtos" : total_produtos })
if __name__ == '__main__':
    app.run(debug=True)