# Projeto Compasscar - Sistema de Locação de Carros

Esta é uma API para gerenciamento de carros, permitindo operações de CRUD (Criar, Ler, Atualizar e Excluir) com um banco de dados MySQL.

## Funcionalidades

- **Criar** um novo carro
- **Ler** informações sobre carros
- **Atualizar** dados de um carro existente
- **Excluir** um carro

## Endpoints

### 1. **Criar Carro**

- **Método:** POST
- **URL:** `/cars`
- **Corpo da Requisição:**
  ```json
  {
    "brand": "Marca",
    "model": "Modelo",
    "year": 2020,
    "items": {
      // Campos adicionais
    }
  }

_Resposta_

- **201 Created** - Se o carro for criado com sucesso.
- **400 Bad Request** - Se os dados enviados forem inválidos.

### 2. **Ler Carros**

- **Método:** GET
- **URL** `/cars`
- **Parâmetros (opicionais):**
    -  **brand** - Marca do carro
    - **model** - Modelo do carro
    - **year** - Ano do carro

_Resposta_

- **200 OK** - Com um objeto JSON contendo count, pages e data
- **204 No Content** - Se não houver carros encontrados.

### 3. **Atualizar Carro**

- **Método:** PATCH
- **URL:** `/cars/:id`
- **Corpo da Requisição:**
  ```json
  {
    "brand": "Marca",
    "model": "Modelo",
    "year": 2020,
    "items": {
      // Campos adicionais
    }
  }

_Resposta_

**201 Created** - Se o carro for atualizado com sucesso.

**400 Bad Request** - Se os dados enviados forem inválidos.

**404 Not Found** - Se o carro não for encontrado.

**409 Conflict** - Se um carro com as mesmas informações já existir.

### 4. **Excluir Carro**
- **Método:** PATCH
- **URL:** `/cars/:id`

_Resposta_

**204 No Content** - Se o carro for excluído com sucesso.

**404 Not Found** - Se o carro não for encontrado.


## Requisitos
**Node.js**

**MySQL**

## Configuração

1. Clone este repositório
````json
git clone https://github.com/jaobarreto/Projeto-Compasscar.git
````

2. Instale as dependências:
````json
 npm install
````

3. Configure o banco de dados MySQL e ajuste as configurações no arquivo .env.

4. Inicie o servidor:
````json
 npm start
````


## Licença
Esse projeto está licenciado sob a MIT License.

## Contribuidores
Gostaríamos de agradecer aos seguintes colaboradores por suas contribuições para este projeto:

- **Carlos** - [GitHub]( https://github.com/Carlosvpm)
- **Guilherme** - [GitHub](https://github.com/gu1lherme10-dev)
- **Raul** - [GitHub](https://github.com/raulzrosa)
- **Talles** - [GitHub](https://github.com/TallesECB)
- **Doris** - [GitHub](https://github.com/DrisHel)
- **Isadora** - [GitHub](https://github.com/isadorabrito)
- **Jailson** - [GitHub](https://github.com/jailson273)

## Contato
Para mais informações, entre em contato com joaobarretoprof@gmail.com