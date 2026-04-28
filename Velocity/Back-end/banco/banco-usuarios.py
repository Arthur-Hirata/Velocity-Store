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
    print(f"Email: {email} , Senha: {senha}")
    
    return jsonify({"mensagem": "Usuário recebido!"})
   

if __name__ == '__main__':
    app.run(debug=True)