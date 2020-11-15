const express = require("express");
const router = express.Router();
const {
  ver_tratamiento,
  crear_tratamiento,
  editar_tratamiento,
  eliminar_tratamiento,
  validar,
} = require("../controllers/controlTratamientos");

router.get('/controlTratamientos', async (req, res) => {
  ver_tratamiento()
      .then((answerDB) => {
          let tratamiento = answerDB.rows;
          res.send({ok: true, info: tratamiento, mensaje: 'controles de tratamientos consultados'});
      })
      .catch(error => {
          res.send(error);
      });
});


router.post("/controlTratamientos", (req, res) => {
  try {
    let info_tratamiento= req.body;

    validar(info_tratamiento);
    crear_tratamiento(info_tratamiento)
      .then((respuestaDB) => { 
        res.send({ ok: true, mensaje: "control tratamiento guardado", info: info_tratamiento });
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

router.put("/controlTratamientos/:id_tratamiento", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id_tratamiento = req.params.id_tratamiento;
    let info_tratamiento = req.body;

    // Actualiza el usuario en base de datos
    editar_tratamiento(info_tratamiento, id_tratamiento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "control tratamiento editado", info: info_tratamiento });
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


router.delete("/controlTratamientos/:id_tratamiento", (req, res) => {
  let id = req.params.id_tratamiento;
  eliminar_tratamiento(id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "control tratamiento eliminado", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


module.exports = router;