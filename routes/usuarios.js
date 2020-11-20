const express = require('express');
const router = express.Router();

const {
    validarUsuario,
    consultarUsuario,
    consultarCelUsuario,
    guardarUsuario,
    
} = require('../controllers/usuarios');

router.get('/usuarios', async (req, res) => {
    consultarUsuario()
        .then((answerDB) => {
            let usuario = answerDB.rows;
            res.send({ok: true, info: usuario, mensaje: 'Usuarios consultados'});
        })
        .catch(error => {
            res.send(error);
        });
  });

  //Consulta del celular por usuario
  router.get('/usuarios/celular/:id_usuario', async (req, res) => {
    let id = req.params.id_usuario;
    consultarCelUsuario(id)
        .then((answerDB) => {
            let usuario = answerDB.rows;
            res.send({ok: true, info: usuario, mensaje: 'Celular de usuario consultado'});
        })
        .catch(error => {
            res.send(error);
        });
  });

// Guarda un nuevo usuario
router.post("/usuarios", (req, res) => {
    try {
      let info_usuario = req.body;
  
      validarUsuario(info_usuario);
  
      guardarUsuario(info_usuario)
        .then((respuestaDB) => {
          console.log("entro");  
          res.send({ ok: true, mensaje: "usuario guardado", info: info_usuario });
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