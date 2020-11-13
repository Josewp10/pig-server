const express = require("express");
const router = express.Router();
const {

  ver_tratamiento,
  crear_tratamiento,
} = require("../controllers/controlTratamientos");

router.get("/controlTratamientos", (req, res) => {
  ver_tratamiento()
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "tratamientos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});


router.post("/controlTratamientos", (req, res) => {
  try {
    let info_tratamiento = req.body;
    crear_tratamiento(info_tratamiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "mantenimiento guardado",
          info: info_tratamiento,
        });
      })
      .catch((error) => {     
          res.send(error) 
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;