
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
Iniciar servidor

	npm run dev
 
## 4º passo:
 Criar um usuário através da rota POST -> USER
 
## 5º passo:
 Logar através da rota POST -> LOGIN
 
## 6º passo:
 Guardar o token obtido através do método de login e utilizar ele no **HEADER Authorization** das próximas requisições
 
## 7º passo:
 Listar todos os filmes através da rota GET -> MOVIES
 

## 8º passo:
  Se o filme que você quer não existe, criá-lo através da rota POST -> MOVIE
  
  
## 9º passo:
 
 
