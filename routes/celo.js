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

//Trae todos los celos
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

//Trae un Celo en específico
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

// Guarda un nuevo celo
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