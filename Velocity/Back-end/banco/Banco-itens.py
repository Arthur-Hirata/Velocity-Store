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

item=[
    ''
]
cursor.execute("INSERT INTO itens (nome, preco, imagem, tipo, componente) VALUES (?, ?, ?, ? ,?)", ("Hyperx cloud 2", 199, "https://m.media-amazon.com/images/I/51PgS3bqxmL._AC_SY300_SX300_QL70_ML2_.jpg", "periferico", "headset"))
#mudança = "	https://img.terabyteshop.com.br/produto/p/gabinete…do-e-atx-sem-fonte-sem-fan-black-v100x_261034.jpg"
#cursor.execute("UPDATE itens SET imagem=? WHERE id=?", (mudança, 2))
# Deletar duplicados (id 15 a 20)
#cursor.execute("DELETE FROM itens WHERE id BETWEEN 15 AND 20")

conexao.commit()

conexao.close()


