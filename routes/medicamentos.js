/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los medicamentos y sus variantes
 */

//Llamado a todas las librerías y servicios requeridos
const express = require('express');
const router = express.Router();
const _controlador = require("../controllers/medicamentos");



/**
 * Petición: Traer todos los medicamentos
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: medicamentos consultados o mensaje de error
 */
router.get('/medicamentos', async (req, res) => {
  
  _controlador
  .consultarMedicamentos()
        .then((medicamentoDB) => {
            let medicamento = medicamentoDB.rows;
            res.send({ok: true, info: medicamento, mensaje: 'medicamentos consultados'});
        })
        .catch(error => {
            res.send(error);
        });
});


/**
 * Petición: Traer un medicamento específico
 * Parámetros: Chapeta, tipo de medicamento
 * Cuerpo: Vacío
 * Respuesta: medicamento consultado o mensaje de error
 */
router.get('/medicamentos/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    
    _controlador
    .consultarMedicamento(codigo)
        .then((medicamentoDB) => {
            let medicamento = medicamentoDB.rows;
            res.send({ok: true, info: medicamento, mensaje: 'Medicamentos consultados'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});



/**
 * Petición: Almacenar la información de un medicamento
 * Parámetros: Vacío
 * Cuerpo: Todos los datos del medicamento
 * Respuesta: Registro del medicamento o mensaje de error
 */
router.post("/medicamentos", (req, res) => {
    try {
      let info_medicamento = req.body;
  
      _controlador.validarMedicamento(info_medicamento);
  
      _controlador
      .guardarMedicamento(info_medicamento)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "Medicamento almacenado", info: info_medicamento });
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
 * Petición: Eliminar la información de un medicamento
 * Parametros: Chapeta del medicamento
 * Cuerpo: Vacío
 * Respuesta: medicamento eliminado o mensaje de error
 */
  router.delete("/medicamentos/:codigo", (req, res) => {
    let codigo = req.params.codigo;

    _controlador
    .eliminarMedicamento(codigo)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Medicamento eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });


/**
 * Petición: Actualizar la información de un medicamento
 * Parametros: Chapeta del medicamento
 * Cuerpo: Todos los datos del medicamento
 * Respuesta: medicamento actualizado o mensaje de error
 */
router.put("/medicamentos/:codigo", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let codigo = req.params.codigo;
      let info_medicamento = req.body;
  
      // Actualiza el usuario en base de datos
      _controlador
      .editarMedicamento(info_medicamento, codigo)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Medicamento editado", info: info_medicamento });
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