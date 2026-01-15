from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Permite requisições do front-end

# Configurações do Banco de Dados
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'suporte_db'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Erro ao conectar ao MariaDB: {e}")
        return None

@app.route('/api/suporte', methods=['POST'])
def criar_chamado():
    dados = request.json
    nome = dados.get('nome_usuario')
    assunto = dados.get('assunto')
    descricao = dados.get('descricao')

    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        query = "INSERT INTO chamados (nome_usuario, assunto, descricao) VALUES (%s, %s, %s)"
        cursor.execute(query, (nome, assunto, descricao))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"mensagem": "Chamado criado com sucesso!"}), 201
    return jsonify({"erro": "Falha na conexão com o banco"}), 500

@app.route('/api/suporte', methods=['GET'])
def listar_chamados():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM chamados ORDER BY data_criacao DESC")
        chamados = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(chamados), 200
    return jsonify({"erro": "Falha na conexão com o banco"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
