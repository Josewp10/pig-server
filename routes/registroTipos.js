/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de las tareas
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/registroTipos');



router.get('/registroTipos/:id_tipo', async (req, res) => {
  
    let id_tipo = req.params.id_tipo;
    
    _controlador
    .consultarTipo(id_tipo)
        .then((tipoDB) => {
            let tipo = tipoDB.rows;
            res.send({ok: true, info: tipo, mensaje: 'Tipo consultado'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });


  router.get('/registroTipos/', async (req, res) => {
  
    
    _controlador
    .consultarTipos()
        .then((tipoDB) => {
            let tipo = tipoDB.rows;
            res.send({ok: true, info: tipo, mensaje: 'Tipos consultadas'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

  
module.exports = router;