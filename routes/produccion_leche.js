/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los árboles genealógicos de los bovinos
 */
//Llamado a todas las librerías, servicios y controladores requeridos
const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/produccion_leche");


/**
 * Petición: Traer todos registros de las producciones de leche.
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Producciones consultadas o mensaje de error
 */
router.get("/produccionLeche", (req, res) => {

  _controlador
    .consultarProducciones()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let produccion = respuestaDB.rows;
      res.send({ ok: true, info: produccion, mensaje: "Producciones consultadas" });
    })
    .catch(error => {
      res.send(error);
    });
});

/**
 * Petición: Traer todos registros genealógicos.
 * Parámetros: id de la producción
 * Cuerpo: Vacío
 * Respuesta: Producción consultada o mensaje de error
 */
router.get('/produccionLeche/:id_produccion', async (req, res) => {

    let id = req.params.id_produccion;
  
    _controlador.consultarProduccion(id)
        .then((respuestaDB) => {
            let produccion = respuestaDB.rows;
            res.send({ok: true, info: produccion, mensaje: 'Produccion consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

/**
 * Petición: Almacena un registro de produccion de leche
 * Parámetros: vacío
 * Cuerpo: Todos los datos del registro produccion de leche
 * Respuesta: Produccion de leche almacenada o mensaje de error
 */
router.post("/produccionLeche", (req, res) => {
  try {
    let info_lecherias = req.body;

    _controlador.validarProduccion(info_lecherias);

    _controlador
    .editarProduccion(info_lecherias)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: " guardada", info: info_lecherias });
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
 * Petición: Eliminar la información de un registro genealógico
 * Parametros: id del bovino
 * Cuerpo: Vacío
 * Respuesta: Registro genealógico eliminado o mensaje de error
 */
  router.delete("/produccionLeche/:id_produccion", (req, res) => {
    let id = req.params.id_produccion;
    
    _controlador.eliminarProduccion(id)
    .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Produccion eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  
  module.exports = router;