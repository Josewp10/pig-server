/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los controles de preñéz
 */

//Llamado a todas las librerías y servicios requeridos
const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/controlPrenez");


/**
 * Petición: Consultar todos los controles de preñéz 
 * Parametros: vacio
 * Cuerpo: Vacío
 * Respuesta: Controles de preñéz consultados o mensaje de error
 */
router.get("/controlPrenez", (req, res) => {

  _controlador
    .consultarControlesPrenez()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let controlPrenez = respuestaDB.rows;
      res.send({ ok: true, info: controlPrenez, mensaje: "Controles de preñez Consultados" });
    })
    .catch(error => {
      res.send(error);
    });
});


/**
 * Petición: Consultar un control de preñéz
 * Parametros: id del control
 * Cuerpo: Vacío
 * Respuesta: Control de preñez consultado o mensaje de error
 */
router.get('/controlPrenez/:id_control', async (req, res) => {

  let id = req.params.id_control;

  if(id=='noCreados'){
    _controlador.consultarNoCreados()
      .then((respuestaDB) => {
          let controlPrenez = respuestaDB.rows;
          res.send({ok: true, info: controlPrenez, mensaje: 'Controles de preñez no creados consultados'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
  }else{
    _controlador.consultarControlPrenez(id)
      .then((respuestaDB) => {
          let controlPrenez = respuestaDB.rows;
          res.send({ok: true, info: controlPrenez, mensaje: 'Control preñez consultado'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
  }
  
});


/**
 * Petición: Actualizar la información de un control de preñéz
 * Parametros: id_control
 * Cuerpo: fecha_palpacion, confirmacion_palpacion, num_parto, id_usuario
 * Respuesta: Conrol de preñéz actualizado o mensaje de error
 */
router.put("/controlPrenez/:id_control", (req, res) => {
  try {
    let id_control = req.params.id_control;
    let info_preñez = req.body;

    _controlador.validar(info_retiro);

    _controlador.actualizarControlRetiro(info_preñez, id_control)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Control de preñéz Editado", info: info_preñez });
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