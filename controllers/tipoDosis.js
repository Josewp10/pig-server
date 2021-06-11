/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de las dosis
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 *@description Se toma el parametro con la información del tipo de dosis y se valida:
 *  - Que no sea vacío
 *  - Que contenga los campos: tipo.
 * @param {Object} dosis 
 */
const validarDosis = dosis => {
    if (!dosis) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del tipo de dosis'
        };

    }else if(!dosis.tipo){
        throw{
            ok: false,
            mensaje: 'Ingrese el nombre de tipo de dosis'
        };
 
   
    }
};

/**
 * @description Consulta los tipos de dosis de la base de datos
 * @returns 
 */
const consultarDosis = async () => {
    let sql = `SELECT id_tipo, tipo
                FROM public."TipoDosis"
                where id_tipo>0 order by id_tipo asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};


/**
 * 
 * @param {String} dosis 
 * @returns 
 */
const guardarDosis = async (dosis) => {
    
    let sql = `INSERT INTO public."TipoDosis"(
         tipo)
        VALUES ($1);`;
    let valores = [dosis.tipo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


module.exports = {validarDosis, consultarDosis, guardarDosis};