
const express = require('express');
const router = express.Router();

const {
    validarTarea,
    guardarTarea,
    consultarTarea,
    eliminarTarea,
    editarTarea
} = require('../controllers/registroTareas');

//Trae todos las tareas
router.get('/registroTareas', async (req, res) => {
    consultarTarea()
        .then((tareaDB) => {
            let tarea = tareaDB.rows;
            res.send({ok: true, info: tarea, mensaje: 'tareas consultadas'});
        })
        .catch(error => {
            res.send(error);
        });
});

// Guarda un nuevo bovino
router.post("/registroTareas", (req, res) => {
    try {
      let info_tarea = req.body;
  
      validarTarea(info_tarea);
  
      guardarTarea(info_tarea)
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

//Elimina un bovino
  router.delete("/registroTareas/:id_registro", (req, res) => {
    let id = req.params.id_registro;
    eliminarTarea(id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "tarea eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  //Actualizar bovino

router.put("/registroTareas/:id_registro", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id_registro = req.params.id_registro;
      let info_tarea = req.body;
  
      // Actualiza el usuario en base de datos
      editarTarea(info_tarea, id_registro)
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