/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los controles de tratamientos
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require("express");
const router = express.Router();
const {
  ver_tratamiento,
  crear_tratamiento,
  editar_tratamiento,
  eliminar_tratamiento,
  validar,
  consultarporControl
} = require("../controllers/controlTratamientos");


/**
 * Petición: Consultar todos los controles de tratamientos
 * Parametros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Controles consultados o mensaje de error
 */
router.get('/controlTratamientos', async (req, res) => {
  ver_tratamiento()
      .then((answerDB) => {
          let tratamiento = answerDB.rows;
          res.send({ok: true, info: tratamiento, mensaje: 'controles de tratamientos consultados'});
      })
      .catch(error => {
          res.send(error);
      });
});

/**
 * Petición: Consultar un control de tratamiento
 * Parametros: id del tratamiento
 * Cuerpo: Vacío
 * Respuesta: Controles consultados o mensaje de error
 */
router.get('/controlTratamientos/:id_tratamiento', async (req, res) => {
  let id = req.params.id_tratamiento;
  consultarporControl(id)
      .then((controlTratamiento) => {
          let controltratamiento = controlTratamiento.rows;
          res.send({ok: true, info: controltratamiento, mensaje: 'Tratamiento consultado'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
});


/**
 * Petición: Guardar un control de tratamiento
 * Parametros: Vacío
 * Cuerpo: Datos del control de tratamiento
 * Respuesta: Control de tratamiento guardado o mensaje de error
 */
router.post("/controlTratamientos", (req, res) => {
  try {
    let info_tratamiento= req.body;

    validar(info_tratamiento);
    crear_tratamiento(info_tratamiento)
      .then((respuestaDB) => { 
        res.send({ ok: true, mensaje: "control tratamiento guardado", info: info_tratamiento });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
      console.log(error); 
    res.send(error);
  }
});

/**
 * Petición: Actualizar un control de tratamiento
 * Parametros: id tratamiento
 * Cuerpo: Datos del control de tratamiento
 * Respuesta: Control actualizado o mensaje de error
 */
router.put("/controlTratamientos/:id_tratamiento", (req, res) => {
  try {
    
    let id_tratamiento = req.params.id_tratamiento;
    let info_tratamiento = req.body;


    editar_tratamiento(info_tratamiento, id_tratamiento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "control tratamiento editado", info: info_tratamiento });
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
 * Petición: Eliminar un controle de tratamiento
 * Parametros: id tratamiento
 * Cuerpo: Vacío
 * Respuesta: Control eliminado o mensaje de error
 */
router.delete("/controlTratamientos/:id_tratamiento", (req, res) => {
  let id = req.params.id_tratamiento;
  eliminar_tratamiento(id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "control tratamiento eliminado", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


module.exports = router;