/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de las tareas
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/registroRazas');



router.get('/registroRazas/:id_raza', async (req, res) => {
  
    let tipo_raza = req.params.id_raza;
    
    _controlador
    .consultarRaza(tipo_raza)
        .then((razaDB) => {
            let raza = razaDB.rows;
            res.send({ok: true, info: raza, mensaje: 'Raza consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });


  router.get('/registroRazas/', async (req, res) => {
  
    
    _controlador
    .consultarRazas()
        .then((razaDB) => {
            let raza = razaDB.rows;
            res.send({ok: true, info: raza, mensaje: 'Razas consultadas'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

  
module.exports = router;