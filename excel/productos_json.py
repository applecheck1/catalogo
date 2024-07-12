import pandas as pd
import json

# Nombre del archivo Excel y cargar todas las hojas en un diccionario de DataFrames
excel_file = 'apple.xlsx'
excel_data = pd.read_excel(excel_file, sheet_name=None)

# Convertir las hojas del Excel en un formato JSON
categorias_json = {}

for categoria, df in excel_data.items():
    productos = []
    for index, row in df.iterrows():
        producto = {
            'nombre': row['nombre'],
            'imagen': row['imagen'],
            'precio': float(row['precio'])  # Asegúrate de convertir el precio al tipo adecuado
        }
        productos.append(producto)
    
    categorias_json[categoria] = productos

# Guardar el resultado en un archivo JSON
with open('productos.json', 'w', encoding='utf-8') as f:
    json.dump(categorias_json, f, ensure_ascii=False, indent=4)

print('Archivo JSON generado exitosamente.')
