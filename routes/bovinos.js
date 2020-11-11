const express = require('express');
const router = express.Router();

const {
    validarBovino,
    guardarBovino,
    consultarBovinos,
    consultarTipo,
    consultarBovino,
    eliminarBovino,
    editarBovino
} = require('../controllers/bovino');

//Trae todos los bovinos
router.get('/bovino', async (req, res) => {
    consultarBovinos()
        .then((bovinoDB) => {
            let bovino = bovinoDB.rows;
            res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
        })
        .catch(error => {
            res.send(error);
        });
});

//Trae un bovino en específico
router.get('/bovino/:chapeta/:tipo', async (req, res) => {
    let id = req.params.chapeta;
    let tipo_bovino = req.params.tipo;
    
    consultarBovino(tipo_bovino,id)
        .then((bovinoDB) => {
            let bovino = bovinoDB.rows;
            res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});
//Trae todos los bovinos según el tipo
router.get('/bovino/:tipo', async (req, res) => {
  let id = req.params.chapeta;
  let tipo_bovino = req.params.tipo;
  
  consultarTipo(tipo_bovino)
      .then((bovinoDB) => {
          let bovino = bovinoDB.rows;
          res.send({ok: true, info: bovino, mensaje: 'bovinos consultados'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
});
// Guarda un nuevo bovino
router.post("/bovino", (req, res) => {
    try {
      let info_bovino = req.body;
  
      validarBovino(info_bovino);
  
      guardarBovino(info_bovino)
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

//Elimina un bovino
  router.delete("/bovino/:chapeta", (req, res) => {
    let id = req.params.chapeta;
    eliminarBovino(id)
      .then((respuestaDB) => {
        console.log("LOLO");
        res.send({ ok: true, mensaje: "Bovino eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  //Actualizar bovino

router.put("/bovino/:chapeta", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let chapeta = req.params.chapeta;
      let info_bovino = req.body;
  
      // Actualiza el usuario en base de datos
      editarBovino(info_bovino, chapeta)
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