import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

conexao = sqlite3.connect('banco-users.db')
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               email TEXT NOT NULL,
               password TEXT NOT NULL,
               buylist TEXT)''')

conexao.commit()

@app.route('/criarUser', methods = ['POST'])
def adc_User():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')
    
    print(f"Email: {email} , Senha: {senha}")
    
    return jsonify({"mensagem": "Usuário recebido!"})
   

if __name__ == '__main__':
    app.run(debug=True)