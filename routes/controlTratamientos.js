const express = require("express");
const router = express.Router();
const {

  ver_tratamiento,
  crear_tratamiento,
} = require("../controllers/controlTratamientos");

router.get('/controlTratamientos', async (req, res) => {
  ver_tratamiento()
      .then((answerDB) => {
          let tratamiento = answerDB.rows;
          res.send({ok: true, info: tratamiento, mensaje: 'tratamientos consultados'});
      })
      .catch(error => {
          res.send(error);
      });
});


router.post("/controlTratamientos", (req, res) => {
  try {
    let info_tratamiento= req.body;


    crear_tratamiento(info_tratamiento)
      .then((respuestaDB) => { 
        res.send({ ok: true, mensaje: "tratamiento guardado", info: info_tratamiento });
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