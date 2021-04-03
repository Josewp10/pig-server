const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/controlPrenez");



router.get("/controlPrenez", (req, res) => {

  _controlador
    .consultarControlesPrenez()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let controlPrenez = respuestaDB.rows;
      res.send({ ok: true, info: controlPrenez, mensaje: "Controles de preñez Consultado" });
    })
    .catch(error => {
      res.send(error);
    });
});



router.get('/controlPrenez/:id_control', async (req, res) => {

  let id = req.params.id_control;

  _controlador.consultarControlPrenez(id)
      .then((respuestaDB) => {
          let controlPrenez = respuestaDB.rows;
          res.send({ok: true, info: controlPrenez, mensaje: 'Control preñez consultado'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
});







router.put("/controlPrenez/:id_control", (req, res) => {
  try {
    let id_control = req.params.id_control;
    let info_preñez = req.body;

    _controlador.validar(info_retiro);

    _controlador.actualizarControlRetiro(info_preñez, id_control)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Control de Retiro Editado", info: info_preñez });
      })
      .catch((error) => {
          console.log(error);
        res.send(error);
      });

    // Responder
  } catch (error) {
      console.log(error);
    res.send(error);
  }
});

module.exports = router;