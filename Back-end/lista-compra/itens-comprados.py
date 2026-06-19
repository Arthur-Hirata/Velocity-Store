import sqlite3
conexao = sqlite3.connect("itens-comprados.db")
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itens_comprados (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               data TEXT DEFAULT CURRENT_TIMESTAMP,
               preco NUM NOT NULL,
               produtos TEXT NOT NULL,
               usuario TEXT NOT NULL
               )''')
conexao.commit()

conexao.close()
