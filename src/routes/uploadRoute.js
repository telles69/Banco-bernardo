import uploadController from '../controllers/uploadController';

export default function (app) {
    app.post('/upload/modelo1', uploadController.create);
}