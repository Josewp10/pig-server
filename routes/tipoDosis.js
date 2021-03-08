/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los tipos de dosis
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/tipoDosis');


router.get('/tipoDosis', async (req, res) => {
  
  _controlador
  .consultarDosis()
        .then((answerDB) => {
            let dosis = answerDB.rows;
            res.send({ok: true, info: dosis, mensaje: 'tipo de dosis consultadas'});
        })
        .catch(error => {
            res.send(error);
        });
  });


  router.post("/tipoDosis", (req, res) => {
    try {
      let info_dosis = req.body;
  
      _controlador.validarDosis(info_dosis);
  
      _controlador
      .guardarDosis(info_dosis)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "tipo de dosis guardado", info: info_dosis });
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


  
module.exports = router;