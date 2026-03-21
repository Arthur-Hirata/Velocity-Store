from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
app= Flask(__name__)
CORS(app)

lista_carrinho= []

def conectar_banco():
    conn = sqlite3.connect("banco-itens.db")
    return conn


@app.route('/adicionar', methods=['POST'])
def adicionar_item():
    dados = request.json
    id_produto = dados.get('id') 

    conexao = conectar_banco()
    cursor = conexao.cursor()
    cursor.execute("SELECT nome, preco FROM itens WHERE id = ?", (id_produto,))
    produto_no_banco = cursor.fetchone()
    conexao.close()
    if produto_no_banco:
        
        novo_item = {
            "id": id_produto,
            "nome": produto_no_banco[0], 
            "preco": produto_no_banco[1]  
        }

        lista_carrinho.append(novo_item)

        return jsonify({"status": "sucesso", "item" : novo_item})
    return jsonify({"status": "erro"}), 404

@app.route('/mostrar', methods =['GET'])
def mostrar_lista():
    return jsonify(lista_carrinho)

if __name__ == '__main__':
    app.run(debug=True)
