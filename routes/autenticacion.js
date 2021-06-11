/**
 * Ruta encargada de las peticiones de autenticación
 * del usuario en la base de datos
 */


//Se hace un llamado a los servicios, librerías y controloadores necesarios
const express = require("express");
const router = express.Router();
const _controller = require("../controllers/autenticacion");


// MIDDLEWARE: Filtro
router.use((req, res, next) => {
  try {
    let url = req.url;
    if (url === "/login") {
      // Sigue en la busqueda de otros recursos
      next();
    } else {
      let token = req.headers.token;
      let verificacion = _controller.validar_token(token);
      next();
    }
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado.",
    });
  }
});
  

 /**
 * Petición: Validar usuario
 * Parametros: Vacío
 * Cuerpo: Datos del usuario
 * Respuesta: Usuario autenticado o no autenticado
 */
router.post("/login", (req, res) => {
    try {
        let usuario = req.body;
        _controller.validarLogin(usuario);
        
        _controller.consultarUsuario(usuario)
        .then(answerDB =>{
            let usuario_consulta = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;
              
                if (usuario_consulta) {
                    let token = _controller.generar_token(usuario);
                    res.status(200).send({
                        ok: true,
                        info: token,
                        message: "Usuario autenticado",
                    });
                } else {
                    res.status(400).send({
                        ok: false,
                        info: {},
                        message: "Correo y/o contraseña incorrectos.",
                    })
            }          
        })
        .catch((error) => {
            res.status(500).send({ fallo: error, mensaje: "ERROR" });
          });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/verificar", (req, res) => {
  try {
    let token = req.headers.token;

    let verificacion = _controller.validar_token(token);
    res.status(200).send({
      ok: true,
      info: verificacion,
      mensaje: "Autenticado.",
    });
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado.",
    });
  }
});


module.exports = router;