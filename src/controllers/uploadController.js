import { response } from 'express';
import Upload from '../utils/Upload.js';


    const create = async(req, res) => {
        
        try {

            const { file } = req.files;
            

            if (!file) {
    
                return res.status(400).send({
                    type: 'error',
                    message: 'File not found in the request.',
                });
            }
    
    
   
        const upload = await Upload(file, {
            id: file.name,
            tipo: file.mimetype,
            tabela: "usuario"
        });
        
    

    if(upload.type !== 'success'){
        return res.status(200).send({
            type: 'error',
            message: "nao sei"
        });
    }


    return res.status(200).send({
        type: 'success',
        message: 'Modelo criado com sucesso',
    });

    }catch (error) {

    return res.status(200).send({
        type: 'error',
        message: 'Algo deu errado no upload do arquivo',
    });
    }}

    export default {
        create
    }
