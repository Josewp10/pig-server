
const express = require("express");
const router = express.Router();

const ServicoCorreo = require("../services/enviarNotificacion");
const _correo = new ServicoCorreo();

const ServicioArchivos = require("../services/archivos");
let _archivos = new ServicioArchivos();

router.post("/enviarCorreo/notificacion", (req, res) => {
  try {
    let info = req.body;
    console.log("TIPO: " + info.tipo);
    console.log("COMENTARIO: " + info.comentario);

    let template = _archivos
      .leerArchivo("templates/notificacion.html")
      .toString();

    //template = template.replace("node_autor", info.nombre);
    template = template.replace("node_obra", info.titulo);
    template = template.replace("node_tarea", info.tarea);
    template = template.replace("node_estado", info.estado);
    template = template.replace("node_tipo", info.tipo);
    template = template.replace("node_comentario", info.comentario);

    //console.log(template);

    _correo
      .enviarCorreo(
        template,
        "gestionpublicacion@gmail.com",
        "Notificación Seguimiento"
      )
      .then((resp) => {
        //console.log(res);
        res.send({ ok: true, mensaje: "Correo enviado" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    //res.send(error);
    console.log(error);
  }
});
module.exports = router;