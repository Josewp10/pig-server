const { response } = require("express");
const express = require("express");
const router = express.Router();
const _controller = require("../controllers/autenticacion");

router.post("/login", (req, res) => {
    try {
        let usuario = req.body;
        _controller.validarLogin(usuario);

        _controller.consultarUsuario(usuario)
        .then(answerDB =>{
            let usuario_consulta = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;

                if (usuario_consulta) {
                    res.status(200).send({
                        ok: true,
                        info: usuario,
                        message: "Usuario autenticado",
                    });
                } else {
                    res.status(400).send({
                        ok: false,
                        info: {},
                        message: "Documento y/o clave incorrecta.",
                    })
            }          
        })
        .catch((error) => {
            res.status(500).send({ fallo: error, mensaje: "aqui estoy" });
          });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

module.exports = router;