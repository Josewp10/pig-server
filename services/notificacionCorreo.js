const nodemailer = require("nodemailer");
require("dotenv").config;

class ServicioCorreo {
  constructor() {}

  async enviarCorreo(plantilla, destinatarios, asunto) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NOTUSER, // generated ethereal user
        pass: process.env.NOTEMAIL, // generated ethereal password
      },
    });

    let mailOptions = {
      from: '"Notificación PIG-Gestión ganadera" <gestionpublicacion@gmail.com>',
      to: destinatarios,
      subject: asunto,
      text: "",
      html: plantilla,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent %s", info.messageId);
      console.log("Preview URL %s", nodemailer.getTestMessageUrl(info));
    });
  }
}

module.exports = ServicioCorreo;