/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para autenticar a los usuarios y dar acceso al sistema
 */

//Llamado a todas las librerías y servicios requeridos

const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información del genealógico y se valida:
 *  - Que no sea vacio
 *  - Que contenga a id_tbovino
 * @param {Object} arbol 
 */
const validarGenealogico = arbol => {
    if (!arbol) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de cada bovino'
        };
    }else if(!arbol. id_tbovino){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }
};

/**
 * @description Consulta todos los registros de genealógicos en la base de datos.
 * @returns 
 */
const consultarGenealogicos = async () => {    
    let sql = `SELECT id_bovino, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta" = "Genealogicos".id_bovino) as "Bovino",
    id_mama, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_mama) as "Mamá",
    id_papa, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_papa) as "Papá",
	 id_abuela, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_abuela) as "Abuela",
    id_abuelo, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_abuelo) as "Abuelo"
    FROM public."Genealogicos" where "id_Tgenealogico">0
	order by id_bovino asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Consulta el registro genealógico de un bovino en específico en la base de datos.
 * @param {int} id_tbovino 
 * @returns 
 */
let consultarGenealogico = async (id_tbovino) => {   
    let sql = `SELECT id_bovino, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta" = "Genealogicos".id_bovino) as "Bovino",
    id_mama, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_mama) as "Mamá",
    id_papa, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_papa) as "Papá",
	 id_abuela, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_abuela) as "Abuela",
    id_abuelo, (SELECT nombre FROM public."Bovinos" where "Bovinos"."chapeta"="Genealogicos".id_abuelo) as "Abuelo"
    FROM public."Genealogicos"
    where EXISTS(SELECT id_bovino FROM public."Genealogicos" where id_bovino= $1) and id_bovino= $1;`;

    let respuesta = await _servicio.ejecutarSql(sql, [id_tbovino]);
    return respuesta;
  };

/**
 * @description Almacena un nuevo registro genealógico en la base de datos.
 * @param {Object} arbol 
 * @returns 
 */
let insertarGenealogico = async (arbol) => {
    let sql = `INSERT INTO public."Genealogicos"( id_bovino, id_mama, id_papa, id_abuela, id_abuelo)
    VALUES ($1, $2, $3, $4, $5);`;

    let values = [
        arbol.id_tbovino,
        arbol.id_mama,
        arbol.id_papa,
        arbol.id_abuela,
        arbol.id_abuelo];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un registro genealógico de la base de datos.
 * @param {int} id_tbovino 
 * @returns 
 */
let eliminarGenealogico = async (id_tbovino) => {
    let sql = `DELETE FROM public."Genealogicos" where id_bovino=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_tbovino]);
    return respuesta
};

/**
 * @description Actualiza la información de registro genealógico en la base de datos.
 * @param {Object} arbol 
 * @param {int} id_tbovino 
 * @returns 
 */
let editarGenealogico = async (arbol, id_tbovino) => {
    if (arbol.id_tbovino != id_tbovino) {
      throw {
        ok: false,
        mensaje: "El id del bovino no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."Genealogicos"
      SET  id_mama=$1, id_papa=$2, id_abuela=$3, id_abuelo=$4 WHERE id_bovino=$5;`;
    let valores = [
        arbol.id_tbovino,
        arbol.id_mama,
        arbol.id_papa,
        arbol.id_abuela,
        arbol.id_abuelo,
    ];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports = {  validarGenealogico,insertarGenealogico, 
    consultarGenealogico, editarGenealogico, 
    eliminarGenealogico, consultarGenealogicos }; 