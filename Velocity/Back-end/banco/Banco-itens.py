import sqlite3
conexao = sqlite3.connect("banco-itens.db")
cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itens (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               preco INTEGER)''')

itens = [
    ('Nvme 1TB Sangsung',999),
    ('SSD Kingston 480GB', 499 ),
    ('HD 2TB Seagate', 699 ),
    ('Z790 AORUS ELITE',1999 ),
    ('B550 M GIGABYTE',1199 ),
    ('H510M GIGABYTE', 799),
    ('Lian Li o11 Dynamic',999 )
]
cursor.executemany("INSERT INTO itens (nome, preco) VALUES (?, ?)", itens)

# Deletar duplicados (id 15 a 20)
#cursor.execute("DELETE FROM itens WHERE id BETWEEN 15 AND 20")

conexao.commit()

conexao.close()


