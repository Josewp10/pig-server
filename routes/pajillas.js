const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/pajillas");



router.get("/pajillas", (req, res) => {

  _controlador
    .consultarPajillas()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let pajillas = respuestaDB.rows;
      res.send({ ok: true, info: pajillas, mensaje: "Pajillas Consultados" });
    })
    .catch(error => {
      res.send(error);
    });
});



router.get('/pajillas/:id_toro', async (req, res) => {

  let id = req.params.id_toro;

  _controlador.consultarPajilla(id)
      .then((respuestaDB) => {
          let pajillas = respuestaDB.rows;
          res.send({ok: true, info: pajillas, mensaje: 'Pajilla consultada'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
});




router.post("/pajillas", (req, res) => {
    try {
      let info_pajillas = req.body;
  
      _controlador.validarPajilla(info_pajillas);
  
      _controlador
      .guardarPajilla(info_pajillas)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "Pajilla guardado", info: info_pajillas });
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


  router.put("/pajillas/:id_toro", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id_toro = req.params.id_toro;
      let info_pajillas = req.body;

      _controlador.validarPajilla(info_pajillas);
  
      // Actualiza uno celo en base de datos
      _controlador
      .editarPajilla(info_pajillas, id_toro)
        .then((respuestaDB) => {
          res.send({ ok: true, mensaje: "Pajilla editada", info: info_pajillas });
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


router.delete("/pajillas/:id_toro", (req, res) => {
  let id = req.params.id_toro;
  
  _controlador.eliminarPajilla(id).then((respuestaDB) => {
      res.send({ ok: true, mensaje: "pajilla eliminada", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


module.exports = router;