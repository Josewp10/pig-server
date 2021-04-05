const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/produccion_leche");



router.get("/produccionLeche", (req, res) => {

  _controlador
    .consultarProduccion()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let produccion = respuestaDB.rows;
      res.send({ ok: true, info: produccion, mensaje: "Producciones consultadas" });
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/produccions/:id_produccion', async (req, res) => {

    let id = req.params.id_produccion;
  
    _controlador.consultarProduccion(id)
        .then((respuestaDB) => {
            let produccion = respuestaDB.rows;
            res.send({ok: true, info: produccion, mensaje: 'produccion consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

  router.delete("/produccions/:id_produccion", (req, res) => {
    let id = req.params.id_produccion;
    
    _controlador.eliminarProduccion(id).then((respuestaDB) => {
        res.send({ ok: true, mensaje: "produccion eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  
  module.exports = router;