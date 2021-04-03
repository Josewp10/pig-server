const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/termos");



router.get("/termos", (req, res) => {

  _controlador
    .consultarTermos()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let termos = respuestaDB.rows;
      res.send({ ok: true, info: termos, mensaje: "Termos Consultados" });
    })
    .catch(error => {
      res.send(error);
    });
});


router.get('/termos/:id_termo', async (req, res) => {

    let id = req.params.id_termo;
  
    _controlador.consultarTermo(id)
        .then((respuestaDB) => {
            let termos = respuestaDB.rows;
            res.send({ok: true, info: termos, mensaje: 'termo consultado'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });
  
  
router.post("/termos", (req, res) => {
    try {
      let info_termos = req.body;
  
      _controlador.validarTermos(info_termos);
  
      _controlador
      .guardarTermo(info_termos)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "termo guardado", info: info_termos });
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

  

  router.put("/termos/:id_termo", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id_termo = req.params.id_termo;
      let info_termo = req.body;

      _controlador.validarTermos(info_termo);
  
      // Actualiza uno celo en base de datos
      _controlador
      .editarTermo(info_termo, id_termo)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Termo editado", info: info_termo });
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

  router.delete("/termos/:id_termo", (req, res) => {
    let id = req.params.id_termo;
    
    _controlador.eliminarTermo(id).then((respuestaDB) => {
        res.send({ ok: true, mensaje: "termo eliminado", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  
  
  module.exports = router;