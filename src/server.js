import 'dotenv/config';
import './models/index.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerDocs from '../swagger.json';
import cors from 'cors';
import fileupload from 'express-fileupload';

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/public', express.static('public'));
app.use(fileupload({createParentPath: true}));
routes(app);
app.use((_, res) => {
  res.status(404).send('404 - Página não encontrada!');
});

app.listen(process.env.API_PORT, () => {
  console.log(`API rodando em http://localhost:${process.env.API_PORT}`);
  console.log(`DOCS em http://localhost:${process.env.API_PORT}/api-docs/`);
});
