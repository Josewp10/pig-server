/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de las lecherias
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();
const _controlador = require("../controllers/lecherias");

/**
 * Petición: Traer todos registros lecherias.
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Lecherias consultadas o mensaje de error
 */
router.get('/lecherias', async (req, res) => {
  
    _controlador
    .consultarLecherias()
          .then((lecheriasDB) => {
              let arbol = lecheriasDB.rows;
              res.send({ok: true, info: arbol, mensaje: 'Lecherias consultados'});
          })
          .catch(error => {
              res.send(error);
          });
  });
  
/**
 * Petición: Traer todos registros de lecherias.
 * Parámetros: id de la lecheria
 * Cuerpo: Vacío
 * Respuesta: lecheria consultado o mensaje de error
 */
router.get('/lecherias/:id_lecheria', async (req, res) => {
    
    let id = req.params.id_lecheria;
    
    _controlador
    .consultarLecheria(id)
        .then((lecheriasDB) => {
            let lecherias = lecheriasDB.rows;
            res.send({ok: true, info: lecherias, mensaje: 'Lecheria consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});

/**
 * Petición: Almacena un registro lecherias
 * Parámetros: vacío
 * Cuerpo: Todos los datos del registro lecherias
 * Respuesta: lecherias almacenado o mensaje de error
 */
router.post("/lecherias", (req, res) => {
    try {
      let info_lecherias = req.body;
  
      _controlador.validar(info_lecherias);
  
      _controlador
      .guardarLecheria(info_lecherias)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "lecheria guardada", info: info_lecherias });
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
 * Petición: Modifica un registro lecherias
 * Parámetros: id de la lecherias
 * Cuerpo: Todos los datos del registro lecherias
 * Respuesta: lecherias almacenado o mensaje de error
 */
  router.put("/lecherias/:id_lecheria", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id_lecheria;
      let info_lecherias = req.body;
  
      // Actualiza el usuario en base de datos
      _controlador
      .actualizarLecheria(info_lecherias, id)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Lecheria editada", info: info_lecherias });
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
 * Petición: Eliminar la información de un registro lecherias
 * Parametros: id de la lecheria
 * Cuerpo: Vacío
 * Respuesta: Registro lecheria eliminado o mensaje de error
 */
router.delete("/lecherias/:id_lecheria", (req, res) => {
    let id = req.params.id_lecheria;

    _controlador
    .eliminarLecheria(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "lecheria eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  module.exports = router;
  