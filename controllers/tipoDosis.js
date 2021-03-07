/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de las dosis
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();
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

//Trae todos los usuario registrados
const consultarDosis = async (dosis) => {
    let sql = `SELECT id_tipo, tipo
	FROM public."TipoDosis";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};


//Inserta dosis en la base de datos
const guardarDosis = async (dosis) => {
    
    let sql = `INSERT INTO public."TipoDosis"(
         tipo)
        VALUES ($1);`;
    let valores = [dosis.tipo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


module.exports = {validarDosis, consultarDosis, guardarDosis};