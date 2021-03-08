/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los usuarios
 */
//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/usuarios');


router.get('/usuarios', async (req, res) => {

  _controlador
    .consultarUsuario()
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

    _controlador
    .consultarCelUsuario(id)
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
  
      _controlador.validarUsuario(info_usuario);
  
      _controlador
      .guardarUsuario(info_usuario)
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