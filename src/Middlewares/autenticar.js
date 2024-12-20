import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const existe = req.headers.authorization;
        if(!existe){
            return res.status(200).send({
                message: "Token nulo"
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        const cliente = jwt.verify(token, process.env.TOKEN_KEY);

        if(!cliente.id){
            return res.status(200).send({
                message: "token incorreto"
            });
        }
        if(cliente.idCargo !== 2){
            return res.status(200).send({
                message: "Voce não tem permissao para acessar essa funcao"
            });
        }
        
        return next();
    } catch (error) {
        return res.status(500).send({
            message: 'Erro token',
            data: error.message
        });
    }
}