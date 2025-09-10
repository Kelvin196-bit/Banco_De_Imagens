# 🖼️ Banco de Imagens 
[Acesse o projeto online](https://banco-de-imagens-bice.vercel.app/)

Projeto tem a finalidade de cadastrar, armazenar e exibir imagens de acordo com as categorias. 

- **Frontend**: hospedado no [Vercel](https://vercel.com/)  
- **Backend**: hospedado no [Alwaysdata](https://alwaysdata.com/)  
- **Uploads de imagens**: gerenciados pelo [Cloudinary](https://cloudinary.com/)  

## Tecnologias
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js
- **Banco de Dados**: MySQL 
- **Upload**: Multer

## Funcionalidades
- Upload de imagens e armazenamento em nuvem
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
- Insira as credenciais do banco de dados (usuário, senha, nome do banco)
- Insira as credenciais do Cloudinary
- Fixe a porta 3000 caso queira rodar localmente
- backend também hospedado no seguinte endereço (Alwaysdata): http://snapstock.alwaysdata.net

### 3. Frontend
```bash
cd frontend
npm install
```
Você pode escolher entre rodar localmente (com backend também local) ou usar o backend remoto (Alwaysdata):
- no front end rode:
```bash
  npm run dev:local
```
ou

```bash
  npm run dev:remote
```

## Próximos Passos
- Implementar autenticação de usuários
- Otimizar métodos de transferência de dados
- Melhorar a interface do frontend
- Paginação e filtros avançados no backend

## Licença
Projeto de uso livre para fins de estudo.


