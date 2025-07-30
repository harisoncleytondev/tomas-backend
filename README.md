# Usuário

## `POST /user/create`

Este endpoint é utilizado para registrar um novo usuário no sistema.

### Corpo da Requisição (Request Body)

O corpo da requisição deve ser um objeto JSON contendo as informações do usuário e suas preferências de interface.
Ao criar a conta o user irá receber 7 dias grátis.

**Exemplo:**

```json
{
  "email": "harisonc081@gmail.com",
  "password": "12345678",
  "username": "harison",
}
```

## `PUT /user/edit/preferences`

Este endpoint é utilizado para editar as preferências do sistema.

### Corpo da Requisição (Request Body)

O corpo da requisição deve ser um objeto JSON contendo as informações de preferência.

**Exemplo:**

```json
  "preferences": {
    "backgroundColor": "#fff",
    "textColor": "#fff",
    "buttonColor": "#fff",
    "extraColor": "#fff",
    "fontOne": "baloo",
    "fontOneSize": 20,
    "fontOneSpacing": 2,
    "fontTwo": "baloo",
    "fontTwoSize": 20,
    "fontTwoSpacing": 2
  }
```

## `POST /user/auth`

Este endpoint permite autenticar uma conta com as credenciais fornecidas e retorna um token JWT caso a autenticação seja bem-sucedida.

### Corpo da Requisição (Request Body)

O corpo da requisição deve ser um objeto JSON contendo as informações email e senha.

**Exemplo:**

```json
{
  "email": "harisonc081@gmail.com",
  "password": "12345678"
}
```

## `GET /auth/google`

Rota de autenticação com o GOOGLE

### Corpo da Requisição (Request Body)

Nenhum corpo de requisição é necessário para este endpoint.

## `GET user/:userEmail`

Este endpoint verifica se um e-mail está cadastrado. Retorna 200 OK se o e-mail existe, ou 404 Not Found caso não exista.

### Corpo da Requisição (Request Body)

Nenhum corpo de requisição é necessário para este endpoint.

# Chats e Mensagens
#### `Nota: Todos os endpoints a seguir requerem um token de autenticação no header Authorization com o formato` ``Bearer <token>``

## `POST /chat/create`

Este endpoint possibilita a criação de um novo chat juntamente com sua mensagem inicial.

### Corpo da Requisição (Request Body)

O corpo da requisição deve ser um objeto JSON contendo o content da mensagem.

**Exemplo:**

```json
{
  "title": "Meu primeiro chat",
  "content": "Olá tomas. Essa é minha primeira mensagem!"
}
```

## `POST /chat/message/:chatId`

Este endpoint viabiliza o envio de uma nova mensagem para o chat especificado por **chatId**.

### Corpo da Requisição (Request Body)

O corpo da requisição deve ser um objeto JSON contendo o content da mensagem e um booleano **isBot** informando se a mensagem é do bot ou do usuário.

**Exemplo:**

```json
{
  "content": "Olá joão que bom que essa é sua primeira mensagem. Como posso ajudar?",
  "isBot": true
}
```
## `GET /chat/:chatId`

Este endpoint retorna informações do chat e suas mensagens para o chat especificado por **chatId**.

### Corpo da Requisição (Request Body)

Nenhum corpo de requisição é necessário para este endpoint.

## `GET /chat`

Este endpoint retorna informações de todos os chats associados ao email do usuário.

### Corpo da Requisição (Request Body)

Nenhum corpo de requisição é necessário para este endpoint.

## `DELETE /chat/delete/:chatId`

Este endpoint deleta um chat e suas mensagens pelo chat especificado por **chatId**.

### Corpo da Requisição (Request Body)

Nenhum corpo de requisição é necessário para este endpoint.
