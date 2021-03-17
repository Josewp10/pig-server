/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de tareas 
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información de la tarea y se valida:
 *  - Que no sea vacío
 *  - Que contenga los campos: id_tarea, id_usuario, fecha.
 * @param {Object} raza 
 */
const validarRaza = raza => {
    if (!raza) {
        throw{
            ok: false,
            mensaje: 'Ingrese la Raza'
        };
    }else if(!raza.id_raza){
        throw{
            ok: false,
            mensaje: 'Ingrese la raza'
        };
    }
};


/**
 * @description Conculta toda la información de una raza en la base de datos.
 * @param {int} id_raza 
 * @returns 
 */
let consultarRaza = async (id_raza) => {
    let sql = `SELECT nombre
	FROM public."Razas"
      WHERE id_raza = $1 `;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_raza]);
    return respuesta;
  };

  let consultarRazas = async () => {
    let sql = `SELECT id_raza, nombre
	FROM public."Razas"`;
      
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  };



module.exports = {consultarRaza,consultarRazas, validarRaza};