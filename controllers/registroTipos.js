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
 * @param {Object} tipo 
 */
const validarTipo = tipo => {
    if (!tipo) {
        throw{
            ok: false,
            mensaje: 'Ingrese la Tipo'
        };
    }else if(!tipo.id_tipo){
        throw{
            ok: false,
            mensaje: 'Ingrese la tipo'
        };
    }
};


/**
 * @description Consulta toda la información de los tipos de bovino en la base de datos.
 * @param {int} id_tipo 
 * @returns 
 */
let consultarTipo = async (id_tipo) => {
    let sql = `SELECT nombre
	FROM public."TiposBovinos"
      WHERE id_tipo = $1 `;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_tipo]);
    return respuesta;
  };

  /**
 * @description Consulta toda la información de un tipo de bovino en la base de datos.
 * @param {int} id_tipo 
 * @returns 
 */
  let consultarTipos = async () => {
    let sql = `SELECT id_tipo, nombre
	FROM public."TiposBovinos"`;
      
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  };


module.exports = {consultarTipo,consultarTipos, validarTipo};