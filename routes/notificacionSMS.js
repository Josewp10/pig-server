/**
 * Esta ruta se encarga de las peticiones del envío de  notificaciones por SMS
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();

const ServicioSMS = require('../services/notificacionSMS');
const _sms = new ServicioSMS();

/**
 * Petición: Enviar notifiación por SMS
 * Parametros: Vacío
 * Cuerpo: 
 *  -Número destinatario
 *  -Mensaje
 * Respuesta: Correo enviado o mensaje de error
 */
router.post('/sms', async (req, res) => {
    
    try {
        let info = req.body;
        //console.log(info);

        _sms
        .enviarSMS(info)
        .then(
            res.send({ ok: true, mensaje: "Mensaje enviado" })
        )
        .catch((error) => {
            console.log(error);
          });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;