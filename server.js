const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const conexao = require('./conexao.js')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Testar a rota GET com a URL seguindo o padrão abaixo: 
// localhost/api/user/email ou sql injection
app.get('/api/user/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        /* SQL Injection
         const getUser = await conexao.query(
            "SELECT * FROM usuario WHERE email = '" + userEmail + "' OR 1=1;"
        ) */

        //Sem SQL Injection
        const getUser = await conexao.query(
            "SELECT * FROM usuario WHERE email = ?",
            [userEmail]
        )
        res.send(getUser[0])
    } catch (err) {
        console.log('Erro ao consultar MySQL:')
        console.log(err.message);
    }
})

app.get('/api/agendamentos', async (req, res) => {
    try {
        const agendamentos = await conexao.query(
            "SELECT agendamentos.id, agendamentos.data_agendamento, usuarios.nome AS usuario_nome, servicos.nome AS servico_nome, servicos.preco FROM agendamentos INNER JOIN usuarios ON agendamentos.usuario_id = usuarios.id INNER JOIN servicos ON agendamentos.servico_id = servicos.id ORDER BY agendamentos.data_agendamento ASC;"
        )
        res.send(agendamentos[0])
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        })
    }
})

app.post('/api/criarAgendamento', async (req, res) => {
    try {
        const { date, usuarioID, servicoID } = req.body;
        if (!usuarioID || !servicoID || !date) {
            res.send({ erro: "Usuário serviço e data precisam ser informados" })
        }
        const [usuario] = await conexao.query("SELECT * FROM usuarios WHERE id = ?", [usuarioID])
        if (usuario.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" })
        }
        const [servico] = await conexao.query("SELECT * FROM servicos WHERE id = ?", [servicoID])
        if (servico.length === 0) {
            return res.status(404).json({ erro: "Serviço não encontrado" })
        }
        const [novoAgendamento] = await conexao.query("INSERT INTO agendamentos (data_agendamento, usuario_id, servico_id) VALUES (?, ?, ?)", [date, usuarioID, servicoID])

        res.status(201).json({
            mensagem: "Agendamento criado com sucesso",
            id: novoAgendamento.insertId
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        })
    }
})

app.get('/api/agendamentos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [agendamento] = await conexao.query(
            `SELECT 
                agendamentos.id,
                usuarios.nome AS usuario_nome,
                servicos.nome AS servico_nome,
                servicos.preco,
                agendamentos.data_agendamento
            FROM agendamentos
            INNER JOIN usuarios
                ON agendamentos.usuario_id = usuarios.id
            INNER JOIN servicos
                ON agendamentos.servico_id = servicos.id
            WHERE agendamentos.id = ?`,
            [id]
        );

        if (agendamento.length === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }

        res.status(200).json(agendamento[0]);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao conectar com MySQL",
            mensagem: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`)
})