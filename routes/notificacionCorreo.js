/**
 * Esta ruta se encarga de las peticiones del envío 
 * de  notificaciones por correo haciendo uso de la plantilla acorde a la notificación
 */


//Llamado a todas las librerías, servicios y controladores requeridos
const express = require("express");
const router = express.Router();

const ServicoCorreo = require("../services/enviarNotificacion");
const _correo = new ServicoCorreo();

const ServicioArchivos = require("../services/archivos");
let _archivos = new ServicioArchivos();



/**
 * Petición: Enviar notifiación por correo
 * Parametros: Vacío
 * Cuerpo:
 *  -Nombre trabajador/Usuario
 *  -Tarea
 *  -Estado de la tarea
 *  -Tipo notificación
 *  -Comentario
 * Respuesta: Correo enviado o mensaje de error
 */
router.post("/enviarCorreo/notificacion", (req, res) => {
  try {
    let info = req.body;
    
    let template = _archivos
      .leerArchivo("templates/notificacion.html")
      .toString();

    template = template.replace("node_trabajador", info.nombre);
    template = template.replace("node_tarea", info.tarea);
    template = template.replace("node_estado", info.estado);
    template = template.replace("node_tipo", info.tipo);
    template = template.replace("node_comentario", info.comentario);

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