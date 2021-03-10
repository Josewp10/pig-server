/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los árboles genealógicos de los bovinos
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();
const _controlador = require("../controllers/genealogicos");

/**
 * Petición: Traer todos registros genealógicos.
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Genealógicos consultados o mensaje de error
 */
router.get('/genealogicos', async (req, res) => {
  
    _controlador
    .consultarGenealogicos()
          .then((arbolDB) => {
              let arbol = arbolDB.rows;
              res.send({ok: true, info: arbol, mensaje: 'Arboles genealogicos de bovinos consultados'});
          })
          .catch(error => {
              res.send(error);
          });
  });
  
/**
 * Petición: Traer todos registros genealógicos.
 * Parámetros: id del bovino
 * Cuerpo: Vacío
 * Respuesta: Genealógico consultado o mensaje de error
 */
router.get('/genealogicos/:id_tbovino', async (req, res) => {
    
    let id = req.params.id_tbovino;
    
    _controlador
    .consultarGenealogico(id)
        .then((arbolDB) => {
            let arbol = arbolDB.rows;
            res.send({ok: true, info: arbol, mensaje: 'Arbol genealogico de bovino consultados'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});

/**
 * Petición: Almacena un registro genealógico
 * Parámetros: vacío
 * Cuerpo: Todos los datos del registro genealógico
 * Respuesta: Genealógico almacenado o mensaje de error
 */
router.post("/genealogicos", (req, res) => {
    try {
      let info_arbol = req.body;
  
      _controlador.validarGenealogico(info_arbol);
  
      _controlador
      .insertarGenealogico(info_arbol)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Arbol guardado", info: info_arbol });
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
 * Petición: Modifica un registro genealógico
 * Parámetros: id del bovino
 * Cuerpo: Todos los datos del registro genealógico
 * Respuesta: Genealógico almacenado o mensaje de error
 */
  router.put("/genealogicos/:id_tbovino", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id_tbovino;
      let info_arbol = req.body;
  
      // Actualiza el usuario en base de datos
      _controlador
      .editarGenealogico(info_arbol, id)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Arbol Genealogico de bovino editado", info: info_arbol });
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
 * Petición: Eliminar la información de un registro genealógico
 * Parametros: id del bovino
 * Cuerpo: Vacío
 * Respuesta: Registro genealógico eliminado o mensaje de error
 */
router.delete("/genealogicos/:id_tbovino", (req, res) => {
    let id = req.params.id_tbovino;

    _controlador
    .eliminarGenealogico(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: " Arbol bovino eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  module.exports = router;