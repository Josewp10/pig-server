/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los bovinos y sus variantes
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();
const _controlador = require("../controllers/bovinos");



/**
 * Petición: Traer todos los bovinos
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Bovinos consultado o mensaje de error
 */
router.get('/bovinos', async (req, res) => {
  
  _controlador
  .consultarBovinos()
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
 * Respuesta: Bovino consultado o mensaje de error
 */
router.get('/bovinos/chapeta_tipo/:chapeta/:tipo', async (req, res) => {
    let id = req.params.chapeta;
    let tipo_bovino = req.params.tipo;
    
    _controlador
    .consultarBovino(tipo_bovino,id)
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
 * Petición: Traer las chapetas o la información completa de todos los bovinos según el tipo
 * Parámetros:  Tipo de bovino, consulta (por tipo ó chapeta)
 * Cuerpo: Vacío
 * Respuesta: Bovinos consultados o mensaje de error
 */
 router.get('/bovinos/:consulta/:tipo', async (req, res) => {

  let tipo_bovino = req.params.tipo;
  let consulta = req.params.consulta;
  let chapeta = req.params.chapeta;
    
  switch (consulta) {
    case 'chapeta':
          _controlador
          .consultarChapeta(chapeta)
          .then((bovinoDB) => {
              let bovino = bovinoDB.rows;
              res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
          })
          .catch(error => {
              console.log(error);
              res.send(error);
          });
      break;
    case 'tipo':
          _controlador
          .consultarPorTipo(tipo_bovino)
          .then((bovinoDB) => {
              let bovino = bovinoDB.rows;
              res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
          })
          .catch(error => {
              console.log(error);
              res.send(error);
          });
      break;
    default:
      break;
  }
  
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
  
      _controlador.validarBovino(info_bovino);
  
      _controlador
      .guardarBovino(info_bovino)
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

    _controlador
    .eliminarBovino(id)
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
      _controlador
      .editarBovino(info_bovino, chapeta)
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