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
    .consultarUsuarios()
        .then((answerDB) => {
            let usuario = answerDB.rows;
            res.send({ok: true, info: usuario, mensaje: 'Usuarios consultados'});
        })
        .catch(error => {
            res.send(error);
        });
  });


  router.get('/usuarios/:id_usuario', async (req, res) => {
    let id = req.params.id_usuario;
        
        if (id==='idnombre') {
          _controlador
          .consultarUsuariosNombreyId()
              .then((answerDB) => {
                  let usuario = answerDB.rows;
                  res.send({ok: true, info: usuario, mensaje: 'Usuarios consultados'});
              })
              .catch(error => {
                  res.send(error);
              });
        } else {
          _controlador
          .consultarUsuario(id)
              .then((answerDB) => {
                  let usuario = answerDB.rows;
                  res.send({ok: true, info: usuario, mensaje: 'Usuarios consultados'});
              })
              .catch(error => {
                  res.send(error);
              });
        }
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
          
          res.send({ ok: true, mensaje: "usuario guardado"});
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

/**
 * Petición: Eliminar la información de un usuario
 * Parametros: id del usuario
 * Cuerpo: Vacío
 * Respuesta: Usuario eliminado o mensaje de error
 */
 router.delete("/usuarios/:id_usuario", (req, res) => {
  let id = req.params.id_usuario;

  _controlador
  .eliminarUsuario(id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Usuario eliminado", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


/**
* Petición: Actualizar la información de un usuario
* Parametros: id del usuario
* Cuerpo: Todos los datos del usuario
* Respuesta: Usuario actualizado o mensaje de error
*/
router.put("/usuarios/:id_usuario", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id_usuario = req.params.id_usuario;
    let info_usuario = req.body;

    // Actualiza el usuario en base de datos
    _controlador
    .editarUsuario(info_usuario, id_usuario)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Usuario editado", info: info_usuario });
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

/**
* Petición: Actualizar la contraseña de un usuario
* Parametros: id del usuario
* Cuerpo: id del usuario y nueva contraseña
* Respuesta: Usuario actualizado o mensaje de error
*/
router.put("/usuarios/contrasena/:id_usuario", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id_usuario = req.params.id_usuario;
    let info_usuario = req.body;

    // Actualiza el usuario en base de datos
    _controlador
    .editarContrasena(info_usuario, id_usuario)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Contraseña actualizada"});
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