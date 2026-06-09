import sqlite3
conexao = sqlite3.connect("banco-itens.db")
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itens (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               preco INTEGER)''')

itens = [
    ('SSD Kingston 480GB',499)
    
]
cursor.executemany("INSERT INTO itens (nome, preco) VALUES (?, ?)", itens)

# Deletar duplicados (id 15 a 20)
#cursor.execute("DELETE FROM itens WHERE id BETWEEN 15 AND 20")

conexao.commit()

conexao.close()


