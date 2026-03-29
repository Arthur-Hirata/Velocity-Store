from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
app= Flask(__name__)
CORS(app)

lista_carrinho= []
preco_final = 0

def conectar_banco():
    conn = sqlite3.connect("banco-itens.db")
    return conn


def calcular_preco_final():
    """Calcula o preço final somando todos os itens do carrinho"""
    total = sum(produto['preco_unitario'] * produto['quantidade'] for produto in lista_carrinho)
    return total

@app.route('/adicionar', methods=['POST'])
def adicionar_item():
    dados = request.json
    id_produto = dados.get('id') 
    imagem_url = dados.get('imagem')
    quntidade = dados.get('quantidade')
   
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
            item_existente['quantidade'] += quntidade
            item_existente['preco'] = produto_no_banco[1] * item_existente['quantidade']
            return jsonify({"status": "atualizado", "item": item_existente})
        else:
            novo_item = {
                "id": id_produto,
                "nome": produto_no_banco[0], 
                "preco_unitario": produto_no_banco[1],
                "preco": produto_no_banco[1] * quntidade,
                "imagem": imagem_url,
                "quantidade": quntidade
            }

            lista_carrinho.append(novo_item)
            return jsonify({"status": "sucesso", "item" : novo_item})
    
    return jsonify({"status": "erro"}), 404

@app.route('/mostrar', methods =['GET'])
def mostrar_lista():
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


if __name__ == '__main__':
    app.run(debug=True)
