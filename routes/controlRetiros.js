/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los contoles de retiro
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/controlRetiros");


/**
 * Petición: Consultar todos los controles de retiro
 * Parametros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Controles consultados o mensaje de error
 */
router.get("/controlRetiros", (req, res) => {

  _controlador
    .consultarControlRetiro()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let controlRetiros = respuestaDB.rows;
      res.send({ ok: true, info: controlRetiros, mensaje: "Controles de Retiro de Leche Consultados" });
    })
    .catch(error => {
      res.send(error);
    });
});


/**
 * Petición: Consultar un control de retiro
 * Parametros: id del retiro
 * Cuerpo: Vacío
 * Respuesta: Control de retiro consultado o mensaje de error
 */
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
 * Petición: Almacenar un control de retiro
 * Parametros: Vacío
 * Cuerpo: Todos los datos del control
 * Respuesta: Control de retiro almacenado o mensaje de error
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
 * Petición: Actualizar un control de retiro
 * Parametros: id del retiro
 * Cuerpo: Todos los datos del control de retiro
 * Respuesta: Control de retiro actualizado o mensaje de error
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
 * Petición: Eliminar un control de retiro
 * Parametros: id del retiro
 * Cuerpo: Vacío
 * Respuesta: Control de retiro actualizado o mensaje de error
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