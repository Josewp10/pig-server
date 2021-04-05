const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información la produccion y se valida:
 *  - Que no sea vacio
 *  - Que contenga: id_bovino,fecha, id_produccion, cantidad_dia, id_usuario
 * @param {Object} arbol 
 */
const validarProduccion = produccion => {
    if (!produccion) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!produccion.id_bovino){
        throw{
            ok: false,
            mensaje: 'Ingrese el la chapeta de la lactante'
        };
    }else if(!produccion.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de la producción'
        };
    }else if(!produccion.lecheria){
        throw{
            ok: false,
            mensaje: 'Ingrese el id de la lecheria'
        };
    }else if(!produccion.cantidad_dia){
        throw{
            ok: false,
            mensaje: 'Ingrese la cantidad producida en éste día'
        };
    }else if(!produccion.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese el id del usuario'
        };
    }
};

/**
 * @description Consulta todos los registros de produccion diaria de leche  de todas las lecherías en la base de datos.
 * @returns 
 */
const consultarProducciones = async () => {    
    let sql =  `SELECT "Produccion_Lactante"."id_Tproduccion",lecheria,"Produccion_Lactante".id_lactante,"Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Produccion_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
	inner join public."Usuarios" on "Producciones_leche".id_usuario="Usuarios".id_usuario;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Consulta todos los registros de produccion diaria de leche de una lechería en la base de datos.
 * @param {int} id_produccion 
 * @returns 
 */
let consultarProduccion = async (id_produccion) => {
    let sql = `SELECT "Produccion_Lactante"."id_Tproduccion",lecheria,"Produccion_Lactante".id_lactante,"Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Produccion_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
	inner join public."Usuarios" on "Producciones_leche".id_usuario="Usuarios".id_usuario
	where "Producciones_leche"."id_Tproduccion"=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_produccion]);
    return respuesta;
  };

/**
 * @description Almacena un nuevo registro de producción de un día y lactante en específico.
 * @param {Object} lecheria 
 * @returns 
 */
 let insertarProduccion = async (lecheria) => {
    let sql = `CALL public.insertProduccionLeche($1,$2,$3,$4,$5);`;

    let values = [
        lecheria.id_bovino,
        arbol.id_lecheria,
        arbol.fecha,
        arbol.cantidad_dia,
        arbol.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un medicamento de la base de datos.
 * @param {String} chapeta 
 * @returns
 */
 const eliminarProduccion = async (chapeta) => {
    let sql = `DELETE FROM public."Producciones_leche"
	            WHERE "id_Tproduccion" = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [chapeta]);
    return respuesta
};

module.exports={validarProduccion,consultarProducciones, consultarProduccion, insertarProduccion, eliminarProduccion};

