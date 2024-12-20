import Usuario from '../models/Usuario';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import encrypt from '../controllers/Crypto';

async function send(req, res) {
    try {
        const {
            email
        } = req.body;
        const response = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!response) {
            return res.status(200).send({
                message: 'Email não encontrado'
            })
        }

        let resetToken = crypto.randomBytes(2).toString("hex");

        response.recuperacao = resetToken;
        await response.save();


        const smtp = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "joaotellles1503@gmail.com",
                pass: "yhxu voom aoxh fmxq",
            },
        });

        function sendMail(to, sub, msg) {
            smtp.sendMail({
                to: to,
                subject: sub,
                html: msg
            })
        };
    
        const HtmlMessage = 
        `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            margin: 0;
            padding: 0;
            color: #fff;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #222;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #ff0000;
            color: #fff;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #FF0000;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
        }
        .code {
            font-size: 20px;
            font-weight: bold;
            color: #ff0000;
            margin-top: 10px;
            display: inline-block;
            padding: 10px;
            border-radius: 4px;
            background-color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #aaa;
        }
        .footer a {
            color: #ff0000;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Recuperação de Senha</h1>
        </div>
        <div class="content">
            <p>Olá ${response.nome},</p>
            <p>Seu código de recuperação de senha é:</p>
            <div class="code">${resetToken}</div>
        </div>
        <div class="footer">
            <p>Se você não solicitou a recuperação de senha, por favor ignore este e-mail.</p>
            <p>Equipe de Suporte - <a href="http://www.seusite.com">PokerStars.net</a></p>
        </div>
    </div>
</body>
</html>
`        


        await sendMail(email, "Recuperação de senha", HtmlMessage);

        return res.status(200).send({
            type: "success",
            message: "Código de recuperação enviado com sucesso!",
            data: response
        });

    } catch (error) {
        return res.status(200).send({
            type: "error",
            message: "!",
            data: error.message
        })
    }
}

const receiveCode = async (req, res) => {
    try {
        let { code, email } = req.body;
        let response = await Usuario.findOne({
            where: {
                email
            }
        });

        if (response.recuperacao === code) {
            response.recuperacao = null;
            await response.save();
            return res.status(200).send({
                type: "success",
                message: "Código de recuperação validado com sucesso!"
            });
        } else {
            return res.status(200).send({
                type: "error",
                message: "Código de recuperação inválido!"
            });
        }

    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const updatePassword = async (req, res) => {
    try {
        let { senha, email } = req.body;

        let response = await Usuario.findOne({
            where: {
                email
            }
        });

        response.senha = encrypt(senha);
            response.token = null;
        await response.save();

        return res.status(200).send({
            type: 'success',
            message: 'Senha atualizada com sucesso, logue-se novamente.'
        });

    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

export default {
    send,
    updatePassword,
    receiveCode
}