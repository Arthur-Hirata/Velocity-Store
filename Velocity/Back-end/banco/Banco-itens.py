
import sqlite3
conexao = sqlite3.connect("banco-itens.db")
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itens (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               preco INTEGER)''')

cursor.executemany("INSERT INTO itens (nome, preco) VALUES (?, ?)", )


conexao.commit()

conexao.close()


