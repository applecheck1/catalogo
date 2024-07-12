import pandas as pd

# Carga el archivo Excel
xls = pd.ExcelFile('apple.xlsx')

# Obtiene los nombres de las hojas
nombres_hojas = xls.sheet_names

# Imprime los nombres de las hojas
for nombre in nombres_hojas:
    print(nombre)
