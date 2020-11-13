const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/controlRetiros");

/**
 * Obtener 
 */
router.get("/controlRetiros", (req, res) => {
  _controlador
    .consultarControlRetiro()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let controlRetiros = respuestaDB.rows;
      res.send({ ok: true, info: controlRetiros, mensaje: "Control Retiro de Leche Consultado" });
    })
    .catch(error => {
      res.send(error);
    });
});

/**
 * Guardar 
 */
router.post("/controlRetiros", async (req, res) => {
  try {
    let info_control = await req.body;

   _controlador.validar(info_control);

    _controlador
      .insertarControlRetiro(info_control)
      .then(respuestaDB => {
        res.send({ ok: true, mensaje: "Control Retiro de Leche Registrado", info: info_control });
      })
      .catch(error => {
        res.send(error);
      });

  } catch (error) {
    res.send(error);
  }
});

module.exports = router