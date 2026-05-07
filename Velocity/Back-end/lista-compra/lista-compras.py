from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json  # Faltava importar isso para usar o json.dumps

app = Flask(__name__)
CORS(app)

lista_carrinho = []

def conectar_banco():
    return sqlite3.connect("banco-itens.db")

def calcular_preco_final():
    """Calcula o preço final somando todos os itens do carrinho"""
    total = sum(produto['preco_unitario'] * produto['quantidade'] for produto in lista_carrinho)
    return total

@app.route('/adicionar', methods=['POST'])
def adicionar_item():
    dados = request.json
    id_produto = dados.get('id') 
    imagem_url = dados.get('imagem')
    quantidade = dados.get('quantidade') # Corrigido digitação 'quntidade'
    user_id = dados.get('id_user')

    # A partir daqui tudo precisa estar indentado (com 4 espaços)
    conexao = conectar_banco()
    cursor = conexao.cursor()
    cursor.execute("SELECT nome, preco FROM itens WHERE id = ?", (id_produto,))
    produto_no_banco = cursor.fetchone()
    conexao.close()	

    if produto_no_banco:
        item_existente = None
        for produto in lista_carrinho:
            if produto['id'] == id_produto:
                item_existente = produto
                break
        
        if item_existente:
            item_existente['quantidade'] += quantidade
            item_existente['preco'] = produto_no_banco[1] * item_existente['quantidade']
            with sqlite3.connect('banco-users.db') as conex:
                cursor = conex.cursor()
                cursor.execute("UPDATE users SET buylist=? WHERE id=?", (json.dumps(lista_carrinho), user_id))
                conex.commit()
            return jsonify({"status": "atualizado", "item": item_existente})
        else:
            novo_item = {
                "id": id_produto,
                "nome": produto_no_banco[0], 
                "preco_unitario": produto_no_banco[1],
                "preco": produto_no_banco[1] * quantidade,
                "imagem": imagem_url,
                "quantidade": quantidade
            }
            lista_carrinho.append(novo_item)
            
            # Correção no banco de usuários
            with sqlite3.connect('banco-users.db') as conex:
                cursor = conex.cursor()
                # O SQLite não salva listas, então convertemos a lista inteira para texto
                carrinho_texto = json.dumps(lista_carrinho)
                cursor.execute("UPDATE users SET buylist=? WHERE id=?", (carrinho_texto, user_id))
                conex.commit()
            
            return jsonify({"status": "sucesso", "item": novo_item})
    
    return jsonify({"status": "erro", "mensagem": "Produto não encontrado"})

@app.route('/mostrar', methods=['POST'])
def mostrar_lista():
    dados = request.json
    user_Id = dados.get('id_user')
    with sqlite3.connect('banco-users.db') as conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT buylist FROM users WHERE id=?", (user_Id,))
        resultado = cursor.fetchone()
        if resultado and resultado[0]:
            lista_carrinho = json.loads(resultado[0])
        else:
            lista_carrinho = []
    return jsonify(lista_carrinho)

@app.route('/atualizar/<string:id>', methods =['PATCH'])
def atualizar_item(id):
    dados = request.json
    quantidade = dados.get('quantidade')
    conexao = conectar_banco()
    cursor = conexao.cursor()
    cursor.execute("SELECT preco FROM itens WHERE id = ?", (id,))
    preco_unitario= cursor.fetchone()
    conexao.close()

    for produto in lista_carrinho:
        if produto['id'] == id:
            produto['quantidade'] = quantidade
            produto['preco_unitario'] = preco_unitario[0]
            produto['preco'] = preco_unitario[0] * quantidade
            
            return {"status": "atualizado"}, 200
    return {"status": "não encontrado"}, 404

@app.route('/diminuir/<string:id>', methods =['PATCH'])
def remover_quantidade(id):
    dados = request.json
    quantidade = dados.get('quantidade')
    conexao = conectar_banco()
    cursor = conexao.cursor()
    cursor.execute("SELECT preco FROM itens WHERE id = ?", (id,))
    preco_unitario= cursor.fetchone()
    conexao.close()

    for produto in lista_carrinho:
        if produto['id'] == id:
            produto['quantidade'] = quantidade
            produto['preco_unitario'] = preco_unitario[0]
            produto['preco'] = preco_unitario[0] * quantidade
            
            return {"status": "atualizado"}, 200
    return {"status": "não encontrado"}, 404

@app.route('/remover/<string:id>', methods =['DELETE'])
def remover_item(id):
 global lista_carrinho
 for produto in lista_carrinho :
    if produto['id'] == id:
       lista_carrinho.remove(produto)
       return {"status" : "removido"}, 200

 return {"status": "não encontrado"}, 404

@app.route('/apagar', methods=['DELETE'])
def apagar_lista():
    global lista_carrinho
    lista_carrinho.clear()
    return jsonify({"status": "lista_apagada"}), 200


@app.route('/precofinal', methods=['GET'])
def final_preco():
    preco_total = calcular_preco_final()
    return jsonify({"preco_final": preco_total})


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


if __name__ == '__main__':
    app.run(debug=True)
