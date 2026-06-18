import sqlite3
from werkzeug.security import generate_password_hash
senha_criptografada = generate_password_hash("")
conexao = sqlite3.connect('banco-users.db')

cursor = conexao.cursor()
admin=[
    'thur@gmail.com',
    '(44) 96731-3129',
    senha_criptografada,
    'Arthur',
    '95555-000',
    'admin'
]
cursor.execute('INSERT INTO users (email, numero, password, nome, address, role) VALUES (?,?,?,?,?,?)', (admin))

conexao.commit()
conexao.close()