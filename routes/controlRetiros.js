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

//Trae uno en específico
router.get('/controlRetiros/:id_retiro', async (req, res) => {
  let id = req.params.id_retiro;
  _controlador.consultarporControlRetiro(id)
      .then((controlRetiro) => {
          let controlRetiros = controlRetiro.rows;
          res.send({ok: true, info: controlRetiros, mensaje: 'Control Retiro consultado'});
      })
      .catch(error => {
          console.log(error);
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

/**
 * Actualizar
 */
router.put("/controlRetiros/:id_retiro", (req, res) => {
  try {
    let id_retiro = req.params.id_retiro;
    let info_retiro = req.body;

    _controlador.actualizarControlRetiro(info_retiro, id_retiro)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Control de Retiro Editado", info: info_retiro });
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

/**
 * Eliminar
 */
router.delete("/controlRetiros/:id_retiro", (req, res) => {
  let id = req.params.id_retiro;
  
  _controlador.eliminarControlRetiro(id).then((respuestaDB) => {
      res.send({ ok: true, mensaje: "control retiro eliminado", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


module.exports = router