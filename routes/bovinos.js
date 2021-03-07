/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los bovinos y sus variantes
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();

const {
    validarBovino,
    guardarBovino,
    consultarBovinos,
    consultarChapeta,
    consultarBovino,
    eliminarBovino,
    editarBovino
} = require('../controllers/bovinos');

/**
 * Petición: Traer todos los bovinos
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Bovinos registrados o mensaje de error
 */
router.get('/bovinos', async (req, res) => {
    consultarBovinos()
        .then((bovinoDB) => {
            let bovino = bovinoDB.rows;
            res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
        })
        .catch(error => {
            res.send(error);
        });
});


/**
 * Petición: Traer un bovino específico
 * Parámetros: Chapeta, tipo de bovino
 * Cuerpo: Vacío
 * Respuesta: Bovino registrado o mensaje de error
 */
router.get('/bovinos/:chapeta/:tipo', async (req, res) => {
    let id = req.params.chapeta;
    let tipo_bovino = req.params.tipo;
    
    consultarBovino(tipo_bovino,id)
        .then((bovinoDB) => {
            let bovino = bovinoDB.rows;
            res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});


/**
 * Petición: Traer todos los bovinos según el tipo
 * Parámetros:  Tipo de bovino
 * Cuerpo: Vacío
 * Respuesta: Bovino registrado o mensaje de error
 */
router.get('/bovinos/:tipo', async (req, res) => {
  let tipo_bovino = req.params.tipo;
  
  consultarChapeta(tipo_bovino)
      .then((bovinoDB) => {
          let bovino = bovinoDB.rows;
          res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
});

/**
 * Petición: Almacenar la información de un bovino
 * Parámetros: Vacío
 * Cuerpo: Todos los datos del bovino
 * Respuesta: Registro del bovino o mensaje de error
 */
router.post("/bovinos", (req, res) => {
    try {
      let info_bovino = req.body;
  
      validarBovino(info_bovino);
  
      guardarBovino(info_bovino)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "Bovino guardado", info: info_bovino });
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
 * Petición: Eliminar la información de un bovino
 * Parametros: Chapeta del bovino
 * Cuerpo: Vacío
 * Respuesta: Bovino eliminado o mensaje de error
 */
  router.delete("/bovinos/:chapeta", (req, res) => {
    let id = req.params.chapeta;
    eliminarBovino(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Bovino eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });


/**
 * Petición: Actualizar la información de un bovino
 * Parametros: Chapeta del bovino
 * Cuerpo: Todos los datos del bovino
 * Respuesta: Bovino actualizado o mensaje de error
 */
router.put("/bovinos/:chapeta", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let chapeta = req.params.chapeta;
      let info_bovino = req.body;
  
      // Actualiza el usuario en base de datos
      editarBovino(info_bovino, chapeta)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Bovino editado", info: info_bovino });
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