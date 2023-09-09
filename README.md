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

Segue as informações utilizadas para se conectar ao banco de dados. Caso suas configurações sejam diferentes, basta alterar o arquivo **.env** presente na pasta **API**. 

- HOST: localhost
- USER: root
- PASSWORD: password
- DATABASE: shopper

## Executando a API localmente

A partir do diretório raiz, acesse o diretório da api:
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

A partir do diretório raiz, acesse o diretório da aplicação react:
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