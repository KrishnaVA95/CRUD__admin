# CRUD de Usuário + Permissão de Administrador

### Introdução

API faz o controle de usuários através de um CRUD. Também conta com o controle de acessos, onde alguns recursos podem ser acessados apenas por usuários que fizeram login na aplicação, e outros recursos apenas usuários que fizeram login e tem permissões de administrador.

### URL Base: localhost:3000

### Endpoints, rotas que não precisam de autenticação

Rota de criação de usuário. A chave admin é opcional, caso não enviada sera definida como false.

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
    "name": "superUser",
    "email": "superuser@mail.com",
    "password": "123456",
    "admin": true,
    "active": false
}
```

###### Resposta:  Status code: 201 CREATED
```json
{
    "id": 1,
    "name": "superUser",
    "email": "superuser@mail.com",
    "admin": true,
    "active": true
}
```


`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
    "email": "superuser@mail.com",
    "password": "123456",
}
```

###### Resposta:  Status code: 200 
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Endpoints, rotas que precisam de autenticação

`GET /users - FORMATO DA REQUISIÇÃO`
Retornar todos os usuários da aplicação.
Conter validação por token.
Apenas administradores podem acessar.

###### Resposta:  Status code: 200 
```json

[
    {
        "id": 1,
        "name": "superUser",
        "email": "superuser@mail.com",
        "admin": true,
        "active": true
    },
    {
        "id": 2,
        "name": "user01",
        "email": "user01@mail.com",
        "admin": false,
        "active": false
    }
]
```

`GET /users/profile - FORMATO DA REQUISIÇÃO`
Rota de perfil. Deve retornar todos os dados dos usuários logado.

###### Resposta:  Status code: 200 
```json
{
    "id": 1,
    "name": "superUser",
    "email": "superuser@mail.com",
    "admin": true,
    "active": true
}
```


`PATCH /users/:id - FORMATO DA REQUISIÇÃO`

Rota de atualização de usuário. Deve ser capaz de atualizar tanto um quanto todos os dados de um usuário.

```json
{
    "name": "Super User",
}
```

###### Resposta:  Status code: 200 
```json
{
    "id": 1,
    "name": "Super User",
    "email": "superuser@mail.com",
    "admin": true,
    "active": true
}
```

`DELETE /users/:id - FORMATO DA REQUISIÇÃO`
Faz o soft delete em um usuário. Modifica a propriedade active da tabela de users para false.

######  Resposta do servidor: Status code: 204

`PUT /users/:id/recover - FORMATO DA REQUISIÇÃO`
Capaz de recuperar o usuário que foi desativado.
O exemplo abaixo foi feito na rota /users/2/recover.

######  Resposta do servidor: Status code: 200

```json
    {
        "id": 2,
        "name": "user01",
        "email": "user01@mail.com",
        "admin": false,
        "active": true
    }
```

# Possíveis erros

`Nas rotas: POST /users e PATCH /users`
O email deve ser único

######  Resposta do servidor: Status code: 409 CONFLICT
```json
{
    "message": "E-mail already registered"
}
```

`Todas as rotas de POST e PATCH`
Contam com serialização de dados.

######  Resposta do servidor: Status code: 400 BAD REQUEST
```json
{
    "name": ["Required"],
    "email": ["Invalid email"],
    "password": ["Expected string, received number"]
}
```

`Nas rotas: GET /users, PATCH /users, DELETE /users e PUT /users`


Contem validação por token, caso o token não seja enviado:

######  Resposta do servidor: Status code: 401 UNAUTHORIZED
```json
{
    "message": "Missing Bearer Token"
}
```

Caso: haja um erro na decodificação do token JWT, retorna o erro padrão da biblioteca:
######  Resposta do servidor: Status code: 401 UNAUTHORIZED

```json
{
  "message": // mensagem padrão da biblioteca
}
```

`Nas rotas:GET /users e PUT /users/:id/recover`

Apenas administradores podem acessar. Se um usuário não administrador fizer requisição, se obtem o seguinte retorno:

######  Resposta do servidor: Status code: 403 FORBIDDEN

```json
{
  "message": "Insufficient Permission"
}
```

`Nas rotas:PATCH /users/:id e DELETE /users/:id`
Tanto usuários administradores quanto não administradores podem fazer requisições:
Um usuário não administrador só pode atualizar ou deletar a sí mesmo;
Um usuário administrador pode atualizar ou deletar qualquer usuário
Caso: um usuário não administrador tente deletar ou atualizar outro usuário que não seja o dele, se obtem o seguinte retorno:
######  Resposta do servidor: Status code: 403 FORBIDDEN

```json
{
  "message": "Insufficient Permission"
}
```

`Na rota: POST /login`
Validamos se o usuário:
<ul>
    <li>Existe (email valido)</li>
    <li>Está ativo</li>
    <li>Se a senha está correta</li>
</ul>
Caso: não passe em alguma das validações anteriores deve-se obter o seguinte retorno:

######  Resposta do servidor: Status code: 401 UNAUTHORIZED
```json
{
    "message": "Wrong email/password"
}
```

`Na rota: PUT /users/:id/recover`
Deve reativar um usuário que está inativo
Caso: o active do usuário com o id enviado na rota já seja true, retornar o seguinte:
######  Resposta do servidor: Status code: 400 BAD REQUEST
```json
{
    "message": "User already active"
}
```

`Nas rotas: que recebem id por parâmetro`
 Verifica se o id passado existe, caso o usuário do id passado não exista retorna:
 ######  Resposta do servidor: Status code: 400 BAD REQUEST
```json
{
    "message": "User not found"
}
```