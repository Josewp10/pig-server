/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los controles de celo
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();

const {
    validarCelo,
    guardarCelo,
    consultarCelos,
    consultarCelo,
    eliminarCelo,
    editarCelo
} = require('../controllers/celo');


/**
 * Petición: consultar todos los celos registrados
 * Parametros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Celos consultados o mensaje de error
 */
router.get('/celo', async (req, res) => {
    consultarCelos()
        .then((celoDB) => {
            let celo = celoDB.rows;
            res.send({ok: true, info: celo, mensaje: 'Celos consultados'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});


/**
 * Petición: Consultar un celo específico
 * Parametros: id del celo
 * Cuerpo: Vacío
 * Respuesta: Celo consultado o mensaje de error
 */
router.get('/celo/:id_celo', async (req, res) => {
    let id = req.params.id_celo;
    consultarCelo(id)
        .then((celoDB) => {
            let celo = celoDB.rows;
            res.send({ok: true, info: celo, mensaje: 'Celo consultado'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});


/**
 * Petición: almacenar un nuevo celo
 * Parametros: Vacío
 * Cuerpo: Todos los datos del celo
 * Respuesta: Celo almacenado o mensaje de error
 */
router.post("/celo", (req, res) => {
    try {
      let info_celo = req.body;
  
      validarCelo(info_celo);
  
      guardarCelo(info_celo)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "Celo guardado", info: info_celo });
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

//Elimina un celo
/**
 * Petición: Eliminar un celo
 * Parametros: id del celo
 * Cuerpo: Vacío
 * Respuesta: Celo eliminado o mensaje de error
 */
  router.delete("/celo/:id_celo", (req, res) => {
    let id = req.params.id_celo;
    eliminarCelo(id)
      .then((respuestaDB) => {
        console.log("LOLO");
        res.send({ ok: true, mensaje: "Celo eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  //Actualizar celo
/**
 * Petición: Actualizar la información de un celo
 * Parametros: id del celo
 * Cuerpo: Todos los datos del celo
 * Respuesta: Celo actualizado o mensaje de error
 */
router.put("/celo/:id_celo", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id_celo = req.params.id_celo;
      let info_celo = req.body;
  
      // Actualiza uno celo en base de datos
      editarCelo(info_celo, id_celo)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Celo editado", info: info_celo });
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