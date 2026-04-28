import sqlite3
conexao = sqlite3.connect('banco-users.db')
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               email TEXT NOT NULL,
               password TEXT NOT NULL,
               buylist TEXT)''')

conexao.commit()