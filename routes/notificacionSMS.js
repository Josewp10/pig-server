const express = require('express');
const router = express.Router();

const ServicioSMS = require('../services/notificacionSMS');
const _sms = new ServicioSMS();

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