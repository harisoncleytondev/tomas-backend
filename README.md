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