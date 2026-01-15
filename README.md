# Sistema de Tickets de Suporte

Sistema web para **abertura e visualização de chamados de suporte**, desenvolvido com foco em **aprendizado prático** e **organização de um projeto full stack simples**.

---

## O que este sistema faz

* Permite criar um chamado de suporte com nome, assunto e descrição
* Salva o chamado no banco de dados
* Lista todos os chamados cadastrados

Tudo funciona de forma simples e direta, sem regras complexas.

---

## Como o sistema funciona (resumo)

1. O usuário preenche o formulário no navegador
2. O JavaScript envia os dados para a API
3. A API (Flask) recebe os dados e salva no banco
4. A página de visualização busca os dados na API
5. Os chamados são exibidos na tela

---

## Tecnologias Utilizadas

**Front-end**

* HTML5 (estrutura das páginas)
* CSS3 (estilo visual)
* JavaScript (envio e recebimento de dados)

**Back-end**

* Python
* Flask (criação da API)
* Flask-CORS (liberação de acesso do front-end)

**Banco de Dados**

* MySQL ou MariaDB

---

## Estrutura do Projeto

```
├── front/
│   ├── index.html              # Formulário para criar chamados
│   ├── visualizar.html         # Tela para listar chamados
│   ├── script_solicitar.js     # Envia dados para o back-end
│   └── script_visualizar.js    # Busca e exibe os chamados
│
├── app.py                      # API em Flask
├── schema.sql                  # Criação do banco e tabela
└── README.md                   # Documentação do projeto
```

---

## Banco de Dados

O banco guarda os chamados enviados pelo sistema.

Script de criação:

```sql
CREATE DATABASE IF NOT EXISTS suporte_db;
USE suporte_db;

CREATE TABLE chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    assunto VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Configuração do Back-end

Instalar dependências:

```bash
pip install flask flask-cors mysql-connector-python
```

Configuração do banco no arquivo `app.py`:

```python
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'suporte_db'
}
```

Executar o servidor:

```bash
python app.py
```

A API ficará disponível em:

```
http://localhost:5000
```

---

## Executando o Front-end

* Abra `index.html` para criar chamados
* Abra `visualizar.html` para visualizar os chamados

O front-end se comunica com o back-end usando requisições HTTP.

---

## Endpoints da API

* **POST** `/api/suporte`
  Cria um novo chamado

* **GET** `/api/suporte`
  Retorna todos os chamados

---

## Autor

**Carlos Almeida**
Projeto desenvolvido para estudo e portfólio, com foco em fundamentos de desenvolvimento web.

