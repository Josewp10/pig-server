/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de bovinos
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();



 /**
  * @description Se toma el parametro con la información del bovino y se valida:
  *  - Que no sea vacio.
  *  - Que contenga la chapeta, tipo bovino.
  * @param {Object} bovino 
  */
const validarBovino = bovino => {
    if (!bovino) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.chapeta){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.id_tipo){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }
};

/**
 * @description Consulta toda la información de los bovinos en la base de datos.
 * @returns
 */
const consultarBovinos = async () => {    
    let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca
               FROM public."Bovinos";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Conslulta un bovino en específico en la base de datos.
 * @param {int} tipo 
 * @param {int} chapeta 
 * @returns
 */
let consultarBovino = async (tipo,chapeta) => {   
    let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca
    FROM public."Bovinos" where id_tipo=$1 and chapeta =$2;`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [tipo,chapeta]);
    return respuesta;
  };

/**
 * @description Conslulta todos los bovinos de un tipo específico.
 * @param {int} tipo  
 * @returns
 */
 let consultarPorTipo = async (tipo) => {
  let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca FROM public."Bovinos"
              WHERE id_tipo = $1 order by finca asc, nombre asc`;
    
  let respuesta = await _servicio.ejecutarSql(sql, [tipo]);
  return respuesta;
}

/**
 * @description Conslulta la chapeta y nombre de los bovinos de un tipo específico.
 * @param {int} tipo  
 * @returns
 */
 let consultarPorTipoEspecifico = async (tipo) => {
  let sql = `SELECT chapeta, nombre
	        FROM public."Bovinos" where id_tipo=$1
           order by finca asc, nombre asc`;
    
  let respuesta = await _servicio.ejecutarSql(sql, [tipo]);
  return respuesta;
}

/**
 * @description Consulta las chapetas de los bovinos filtradas por el tipo de bovino.
 * @param {int} tipo 
 * @returns
 */
  let consultarChapeta = async (tipo) => {
  let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca FROM public."Bovinos"
            WHERE chapeta = $1 `;    
  let respuesta = await _servicio.ejecutarSql(sql, [tipo]);
  return respuesta;
};

/**
 * @description Almacena un nuevo bovino en la base de datos.
 * @param {Object} bovino
 * @returns 
 */
const guardarBovino = async (bovino) => {
    let sql = `INSERT INTO public."Bovinos"(chapeta, id_tipo, nombre, id_raza, genetica, finca)
                VALUES ($1, $2, $3, $4, $5, $6);`;
    let valores = [bovino.chapeta, bovino.id_tipo, bovino.nombre, bovino.id_raza, bovino.genetica, bovino.finca];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


/**
 * @description Elimina un bovino de la base de datos.
 * @param {String} chapeta 
 * @returns
 */
const eliminarBovino = async (chapeta) => {
    let sql = `DELETE FROM public."Bovinos" where chapeta = $1`;    
    let respuesta = await _servicio.ejecutarSql(sql, [chapeta]);
    return respuesta
};

/**
 * @description Modifica la información de un bovino.
 * @param {Object} bovino 
 * @param {String} chapeta
 * @returns 
 */
const editarBovino = async (bovino, chapeta) => {
    if (bovino.chapeta != chapeta) {
      throw {
        ok: false,
        mensaje: "El id del bovino no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."Bovinos"
        SET chapeta=$1, id_tipo=$2, nombre=$3, id_raza=$4, genetica=$5, finca=$6
        WHERE chapeta = $7;`;
    let valores = [bovino.chapeta, bovino.id_tipo, bovino.nombre, 
      bovino.id_raza, bovino.genetica, bovino.finca, chapeta];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };
  

module.exports = {validarBovino, consultarBovinos, 
                 consultarBovino,consultarChapeta,
                 guardarBovino, eliminarBovino, 
                 editarBovino, consultarPorTipo, consultarPorTipoEspecifico};