# Teste técnico - desenvolvedor fullstack junior - Shopper

## API

A URL base da API desenvolvida em Express, quando executada localmente é http://localhost:4000. E conta com 2 rotas:

- POST /validate: Faz a validação dos dados dos produtos enviados;
- PUT /update: Faz a atualização dos produtos no banco de dados;

## Baixando o projeto

Clone o repositório em sua máquina:
```
git clone https://github.com/VitorVA6/teste_tecnico_shopper.git
```

## Banco de dados MySQL

Caso suas configurações sejam diferentes, basta alterar o arquivo **.env** presente na pasta **API**. Segue as informações utilizadas para se conectar ao banco de dados:

- host: localhost
- user: root
- password: password
- database: shopper

## Executando a API localmente

Acesse o diretório da api:
```
cd api
```
Instale as dependências:
```
yarn
```
Execute o arquivo index.js
```
node index.js
```

## Executando a aplicação React

Acesse o diretório da aplicação:
```
cd front-end
```
Instale as dependências:
```
yarn
```
Execute a aplicação:
```
yarn dev
```
Pronto! Agora basta abrir seu browser e acessar o endereço http://localhost:5173