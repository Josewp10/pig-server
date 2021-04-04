/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de las lecherías
 */

//Llamado a todas las librerías, servicios y controladores requeridos
const express = require('express');
const router = express.Router();
const _controlador = require('../controllers/lecherias');

/**
 * Petición: consultar registrados
 * Parametros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Celos consultados o mensaje de error
 */
 router.get('/lecheria', async (req, res) => {
  
    _controlador  
      .consultarCelos()
          .then((celoDB) => {
              let celo = celoDB.rows;
              res.send({ok: true, info: celo, mensaje: 'Celos consultados'});
          })
          .catch(error => {
              console.log(error);
              res.send(error);
          });
  });
  