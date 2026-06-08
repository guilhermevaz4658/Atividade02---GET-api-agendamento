# Documentação de Teste da Atividade

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Instalação

Instale as dependências do projeto executando o comando:

```bash
npm install
```

## Configuração das Variáveis de Ambiente

1. Localize o arquivo `.env.example`.
2. Preencha as variáveis de ambiente necessárias com os valores apropriados.
3. Renomeie o arquivo para `.env`.

## Executando a Aplicação

Inicie o servidor executando:

```bash
node server.js
```

## Testando o Endpoint

Após iniciar a aplicação, acesse o endpoint abaixo para realizar os testes:

```http
http://localhost:3000/api/agendamentos
```

Você pode utilizar ferramentas como Postman, Insomnia ou cURL para realizar as requisições.
