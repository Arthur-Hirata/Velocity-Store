import sqlite3
conexao = sqlite3.connect("banco-itens.db")
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itens (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               preco INTEGER,
               imagem TEXT NOT NULL,
               tipo TEXT NOT NULL, 
               componente TEXT NOT NULL)''')

#itens = [
#]
#cursor.executemany("INSERT INTO itens (nome, preco, imagem, tipo, componente) VALUES (?, ?, ?, ? ,?)", itens)
mudança = "	https://img.terabyteshop.com.br/produto/p/gabinete…do-e-atx-sem-fonte-sem-fan-black-v100x_261034.jpg"
cursor.execute("UPDATE itens SET imagem=? WHERE id=?", (mudança, 2))
# Deletar duplicados (id 15 a 20)
#cursor.execute("DELETE FROM itens WHERE id BETWEEN 15 AND 20")

conexao.commit()

conexao.close()


