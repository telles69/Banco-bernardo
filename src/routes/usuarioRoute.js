import UsuarioController from '../controllers/usuarioController';
import nodemailer from "../utils/nodemailer";
import autenticar from "../Middlewares/autenticar";

export default (app) => {
  app.get('/usuario', UsuarioController.get);
  app.get('/usuario/get-junta', UsuarioController.JuntarTabelas);
  app.get('/usuario/:id', UsuarioController.get);
  app.get('/usuario/sessoes/:idUsuario', UsuarioController.sessoesCompradasNaoComeçadas);
  app.get('/usuario/findemail/:email', UsuarioController.findEmail);
  app.post('/usuario/login', UsuarioController.login);
  app.post('/usuario', UsuarioController.persist);
  app.post('/usuario/cancelar-sessao', UsuarioController.cancelarSessao);
  app.post('/usuario/comprar/:idLugar', UsuarioController.comprarSessao);
  app.post('/usuario/:id', UsuarioController.persist);
  app.delete('/usuario/:id', UsuarioController.destroy);
  app.post('/send', nodemailer.send);
  app.post('/code', nodemailer.receiveCode);
  app.post('/newPassword', nodemailer.updatePassword);
};
