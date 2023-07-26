import nodemailer from "nodemailer";
import { templateNovoUsuario } from "../templates/novoUsuario.js";

const smtp = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "gabriel.boldi@hotmail.com",
    pass: "OdeioFazerSenha123!"
  }
});

const configEmailNovoUsuario = (to, senha) => {
  return {
    from: "gabriel.boldi@hotmail.com",
    to: `${to}`,
    subject: "KMB Controle de serviço",
    html: templateNovoUsuario(senha)
  };
};

export const enviarEmailNovoUsuario = (email: string, senha: string) => {
  new Promise((resolver, reject) => {
    smtp.sendMail(configEmailNovoUsuario(`${email}`, `${senha}`))
      .then(res => {
        smtp.close();
        return resolver(res);
      }).catch(err => {
        smtp.close();
        return reject(err);
      });
  });
};