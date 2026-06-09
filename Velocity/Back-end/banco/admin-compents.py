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
        resultado1 = cursor.fetchone()
    total_users = resultado1[0] if resultado1 else 0

    with sqlite3.connect("banco-itens.db") as conex:
        cursor= conex.cursor()
        cursor.execute("SELECT COUNT(*) AS total_produtos FROM itens")
        resultado2 = cursor.fetchone()
    total_produtos = resultado2[0] if resultado2 else 0

    with sqlite3.connect("itens-comprados.db") as conexao:
        cursor=conexao.cursor()
        cursor.execute("SELECT COUNT(*) AS total_vendas FROM itens_comprados")
        resultado3 = cursor.fetchone()
    total_vendas = resultado3 [0] if resultado3 else 0

    with sqlite3.connect("itens-comprados.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT SUM(preco) FROM itens_comprados")
        resultado4 = cursor.fetchone()
    valor_total = resultado4 [0] if resultado4 else 0

    with sqlite3.connect("itens-comprados.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT COUNT(*) FROM itens_comprados WHERE data>= datetime('now', '-24 hours', 'localtime')")
        resultado5 = cursor.fetchone()
    vendas24hrs = resultado5[0] if resultado5 else 0

    with sqlite3.connect('itens-comprados.db') as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT data FROM itens_comprados ORDER BY id DESC LIMIT 1")
        resultado6 = cursor.fetchone()
    data_ultima_venda = resultado6[0] if resultado6 else "Sem vendas"
    return jsonify({"users" : total_users, "produtos" : total_produtos, "vendas" : total_vendas, "faturamento" : valor_total, "vendasDia": vendas24hrs, 'ultima_venda' : data_ultima_venda})

@app.route('/getUsers', methods=['GET'])
def pegarUsers():
    with sqlite3.connect("banco-users.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT id, email, nome, numero, buylist FROM users")
        resultado = cursor.fetchall()
    user = []
    for id, email, nome, numero, lista in resultado:
        user.append(
        {
            'id' : id,
            'nome': nome,
            'numero' : numero,
            'email' : email,
            'lista' : lista
        })
    return jsonify({"user": user}),200
@app.route('/pegarItens', methods=['GET'])
def pegarItens():
    with sqlite3.connect("banco-itens.db") as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT id, nome, preco FROM itens")
        resultado = cursor.fetchall()
    item=[]
    for id, nome, preco in resultado:
        item.append({
            'id' : id,
            'nome' : nome,
            'preco': preco
        })
    return jsonify({"item" : item})

@app.route('/atualizarItem', methods=['PATCH'])
def atualizarItem():
    dados = request.json
    item_id = dados.get('id')
    nome = dados.get('nome')
    preco = dados.get('preco')
    try:
        with sqlite3.connect('banco-itens.db') as conexao:
            cursor = conexao.cursor()
            cursor.execute("UPDATE itens set nome=?, preco=? WHERE id=?", (nome, preco, item_id))
            conexao.commit()
    except sqlite3.Error as e:
        return jsonify({"mensagem": "Erro no banco de dados"}), 500
    return jsonify({"mensagem": "Item atualizado com sucesso"}), 200
 
@app.route('/adcItem', methods=['POST'])
def adcItem():
    dados = request.json
    nome= dados.get('nome')
    preco = dados.get('preco')
    try:
        with sqlite3.connect("banco-itens.db") as conexao:
            cursor = conexao.cursor()
            cursor.execute("INSERT INTO itens (nome, preco) VALUES(?,?)", (nome, preco))
            conexao.commit()
    except sqlite3.Error as e:
        return jsonify({"mensagem": "Erro no banco de dados"}), 500
    return jsonify({"mensagem" : "Item adcionando com sucesso"}), 201

@app.route('/apagarUser', methods=['DELETE'])
def deletarUser():
    dados = request.json
    userId = dados.get("idUser")
    try:
        with sqlite3.connect("banco-users.db") as conexao:
            cursor = conexao.cursor()
            cursor.execute("DELETE FROM users WHERE id=?", (userId,))
            conexao.commit()
    except sqlite3.Error as e:
        return jsonify({"mensagem": "Erro ao excluir o usuário"})
    return jsonify({"mensagem":"Usuário excluido com sucesso"})

@app.route('/deletarItem', methods = ['DELETE'])
def deletarItem():
    dados= request.json
    itemId = dados.get("itemId")
    try:
        with sqlite3.connect("banco-itens.db") as conexao:
            cursor= conexao.cursor()
            cursor.execute("DELETE FROM itens WHERE id=?", (itemId,))
            conexao.commit()
    except sqlite3.Error as e:
        return jsonify({"mensagem" : "Erro ao excluir Item do banco de dados"})
    return jsonify({"mensagem" : "Item exluido do banco de dados com sucesso"})

if __name__ == '__main__':
    app.run(debug=True)