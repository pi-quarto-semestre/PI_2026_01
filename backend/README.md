[Página inicial](README.md) | [Como contribuir: Backend](backend/README.md) | [Como contribuir: Frontend](frontend/README.md)
# Instruções para o backend
## Como rodar
### 1. Clone o projeto a partir deste repositório:  
	
	https://github.com/pi-quarto-semestre/PI_2026_01.git
	
### 2. Dentro da pasta do projeto, abra a pasta backend em sua IDE de preferência.  
#### 2.1 Exemplo: Eclipse IDE

No caso do Eclipse, por exemplo, simplesmente importe o projeto: 

    Menu File > Open Projects from File System... > Directory
    
E selecione a pasta do projeto.

Não é necessário executar nenhum comando específico para baixar ou fazer build de bibliotecas. Você já pode começar a contribuir!

### 3. Crie o database
- Para testar o código com uma conexão à base de dados, é necessário instalar e ter uma instância ativa do [postgresql](https://www.postgresql.org/download/)
- Após instalar, crie uma base de dados chamada `DeereMail`
- Na database criada, execute o Script `CreateDatabase.sql`, presente na raiz da pasta backend

### 4. Crie o arquivo `settings.ini`
Duplique o arquivo `settings.exmple.ini` com o nome `settings.ini` e defina os parâmetros da sua aplicação.

Atenção especial para o usuário e a senha da sua instância do postgres

### 5. Execute o projeto
Para a execução em runtime de teste, utilize a função de laucher de sua IDE de preferência


