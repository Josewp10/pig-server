/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de las tareas
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/registroTareas');


router.get('/registroTareas', async (req, res) => {
  
  _controlador
  .consultarTareas()
        .then((tareaDB) => {
            let tarea = tareaDB.rows;
            res.send({ok: true, info: tarea, mensaje: 'tareas consultadas'});
        })
        .catch(error => {
            res.send(error);
        });
});

router.get('/registroTareas/:id_registro', async (req, res) => {
  
    let tipo_tarea = req.params.id_registro;
    
    _controlador
    .consultarTarea(tipo_tarea)
        .then((tareaDB) => {
            let tarea = tareaDB.rows;
            res.send({ok: true, info: tarea, mensaje: 'Tarea consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

router.post("/registroTareas", (req, res) => {
    try {
      let info_tarea = req.body;
  
      _controlador.validarTarea(info_tarea);
  
      _controlador
      .guardarTarea(info_tarea)
        .then((respuestaDB) => { 
          res.send({ ok: true, mensaje: "tarea guardada", info: info_tarea });
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

  router.delete("/registroTareas/:id_registro", (req, res) => {
    let id = req.params.id_registro;

    _controlador
    .eliminarTarea(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "tarea eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  

router.put("/registroTareas/:id_registro", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id_registro = req.params.id_registro;
      let info_tarea = req.body;
  
      _controlador.validarTarea(info_tarea);
      
      _controlador
      .editarTarea(info_tarea, id_registro)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "tarea editada", info: info_tarea });
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