# 🖼️ Banco de Imagens 

Projeto tem a finalidade de cadastrar, armazenar e exibir imagens de acordo com as categorias. 

## Tecnologias
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js
- **Banco de Dados**: MySQL 
- **Upload**: Multer

## Funcionalidades
- Upload de imagens e armazenamento no backend
- Organização por **categorias**
- Filtro no **backend** para buscar imagens por categoria
- Listagem e visualização das imagens
- Integração com banco de dados MySQL

## Estrutura do projeto

```bash
banco-de-imagens/
├─ backend/ # Código do backend + schema.sql + .env
├─ frontend/ # Código do frontend
└─ README.md # Este arquivo
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/banco-de-imagens.git
cd banco-de-imagens
```

### 2. Backend
```bash
cd backend
npm install
npm start
```

- Crie o banco de dados executando o script `schema.sql` dentro do MySQL
- Configure as credenciais no arquivo .env (usuário, senha, nome do banco).

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

**O frontend rodará em http://localhost:5173**

**O backend rodará em http://localhost:3001**

## Próximos Passos
- Implementar autenticação de usuários
- Upload de imagens para nuvem (ex: AWS S3)
- Melhorar a interface do frontend
- Paginação e filtros avançados no backend

## Licença
Projeto de uso livre para fins de estudo.
