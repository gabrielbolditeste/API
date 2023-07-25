import nodemailer from "nodemailer";
import { templateEsqueciMinhaSenha } from "../templates/esqueciMinhaSenha.js";

const smtp = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "gabriel.boldi@hotmail.com",
    pass: "OdeioFazerSenha123!"
  }
});

const configEmailEsqueciMinhaSenha = (to, senha) => {
  return {
    from: "gabriel.boldi@hotmail.com",
    to: `${to}`,
    subject: "KMB Controle de serviço",
    html: templateEsqueciMinhaSenha(senha)
  };
};

export const enviarEmailEsqueciMinhaSenha = (email: string, senha: string) => {
  new Promise((resolver, reject) => {
    smtp.sendMail(configEmailEsqueciMinhaSenha(`${email}`, `${senha}`))
      .then(res => {
        smtp.close();
        return resolver(res);
      }).catch(err => {
        smtp.close();
        return reject(err);
      });
  });
};


