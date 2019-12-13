
# Lipes-Blockbuster
 Node.js REST API for a movie store

Documentação:
https://documenter.getpostman.com/view/9781630/SWE9YGNY

## 1º passo:
#### IMPORTANTE 

Criar o **.env** baseado em **.env.example**

	sudo cp .env.example .env
Alterar o **.env** de acordo com as configs do seu banco, portas etc.
 
	sudo nano .env 
 
## 2º passo:
Instalar todas as dependencias do projeto
	
	npm install
	
## 3º passo:
Criar o banco de dados e executar o script **./db/dump.sql**
	
	mysql -uroot -ppassword
	
	create database blockbuster;
	
	use blockbuster;
	
	source (..)/db/dump.sql;

 
## 4º passo:
Iniciar servidor

	npm run dev
 
## 5º passo:
Criar um usuário através da rota POST -> USER
 
## 6º passo:
Logar através da rota POST -> LOGIN
 
# IMPORTANTE 7º passo:
Guardar o token obtido através do método de login e utilizar ele no **HEADER Authorization** das próximas requisições
 
## 8º passo:
Listar todos os filmes através da rota GET -> MOVIES
 

## 9º passo:
Se o filme que você quer não existe, criá-lo através da rota POST -> MOVIE
  
  
## 10º passo:
Alugar o filme, através da rota POST -> RENT

## 11º passo:
Agora, fique a vontade para alugar outros filmes ou verificar os que já alugou, ou fazer logout.
 
 
