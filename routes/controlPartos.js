/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información del control partos
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();
const _controlador = require("../controllers/controlPartos");

/**
 * Petición: Traer todos registros control partos.
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Control partos consultadas o mensaje de error
 */
router.get('/controlPartos', async (req, res) => {
  
    _controlador
    .consultarControlPartos()
          .then((partosDB) => {
              let parto = partosDB.rows;
              res.send({ok: true, info: parto, mensaje: 'Control Partos consultados'});
          })
          .catch(error => {
              res.send(error);
          });
  });
  
/**
 * Petición: Traer todos registros de control partos.
 * Parámetros: id del parto
 * Cuerpo: Vacío
 * Respuesta: Control Parto consultado o mensaje de error
 */
router.get('/controlPartos/:id_parto', async (req, res) => {
    
    let id = req.params.id_parto;
    
    _controlador
    .consultarControlParto(id)
        .then((partosDB) => {
            let parto = partosDB.rows;
            res.send({ok: true, info: parto, mensaje: 'Control parto consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});

/**
 * Petición: Almacena un registro control partos
 * Parámetros: vacío
 * Cuerpo: Todos los datos del registro control partos
 * Respuesta: control partos almacenado o mensaje de error
 */
router.post("/controlPartos", (req, res) => {
    try {
      let info_partos = req.body;
  
      _controlador.validar(info_partos);
  
      _controlador
      .guardarControlParto(info_partos)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "control parto guardado", info: info_partos });
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
 * Petición: Modifica un registro control partos
 * Parámetros: id del parto
 * Cuerpo: Todos los datos del registro control partos
 * Respuesta: control partos almacenado o mensaje de error
 */
  router.put("/controlPartos/:id_partos", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id_partos;
      let info_partos = req.body;
  
      // Actualiza el usuario en base de datos
      _controlador
      .actualizarControlParto(info_partos, id)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Lecheria editada", info: info_partos });
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
 * Petición: Eliminar la información de un control de partos
 * Parametros: id control de parto
 * Cuerpo: Vacío
 * Respuesta: Registro control de parto eliminado o mensaje de error
 */
router.delete("/controlPartos/:id_parto", (req, res) => {
    let id = req.params.id_parto;

    _controlador
    .eliminarControlParto(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "control parto eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  module.exports = router;
  