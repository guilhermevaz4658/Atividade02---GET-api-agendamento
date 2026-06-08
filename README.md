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

## Testando os Endpoints

Após iniciar a aplicação, acesse o endpoint abaixo para realizar os testes:

```
http://localhost:3000/api/agendamentos
```

## Listar Agendamentos
Método
GET /api/agendamentos
URL

```
http://localhost:3000/api/agendamentos
```

## Criar Agendamento
Método
POST /api/criarAgendamento
URL
```
http://localhost:3000/api/criarAgendamento
```
Ferramenta Utilizada

Os testes desta rota foram realizados utilizando o Thunder Client (extensão do VS Code).

## Como Testar no Thunder Client
- Abrir o VS Code.
- Abrir a extensão Thunder Client.
- Criar uma nova requisição.
- Selecionar o método POST.
- Informar a URL:
```
http://localhost:3000/api/criarAgendamento
```
- Acessar a aba Body.
- Selecionar o formato JSON.
- Informar os dados do agendamento.
- Exemplo de Body:
{
  "date": "2026-06-10 14:00:00",
  "usuarioID": 1,
  "servicoID": 2
}
