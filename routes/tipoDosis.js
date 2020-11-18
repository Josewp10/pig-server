const express = require('express');
const router = express.Router();

const {
    validarDosis,
    consultarDosis,
    guardarDosis,
    
} = require('../controllers/tipoDosis');

router.get('/tipoDosis', async (req, res) => {
    consultarDosis()
        .then((answerDB) => {
            let dosis = answerDB.rows;
            res.send({ok: true, info: dosis, mensaje: 'tipo de dosis consultadas'});
        })
        .catch(error => {
            res.send(error);
        });
  });

// Guarda un nuevo tipo de Dosis
router.post("/tipoDosis", (req, res) => {
    try {
      let info_dosis = req.body;
  
      validarDosis(info_dosis);
  
      guardarDosis(info_dosis)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "tipo de dosis guardado", info: info_dosis });
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