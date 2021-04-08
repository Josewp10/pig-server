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
    let sql =  `SELECT "Produccion_Lactante"."id_Tproduccion",lecheria,"Produccion_Lactante".id_lactante,
        "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre as Encargado
        FROM public."Produccion_Lactante"
        inner join public."Bovinos" on id_lactante = chapeta
        inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
        inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".lecheria
        inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Consulta todos los registros de produccion diaria de leche de una lechería en la base de datos.
 * @param {int} id_produccion 
 * @returns 
 */
let consultarProduccion = async (id_produccion) => {
    let sql = `SELECT "Produccion_Lactante"."id_Tproduccion",lecheria,"Produccion_Lactante".id_lactante,
        "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre Encargado
        FROM public."Produccion_Lactante"
        inner join public."Bovinos" on id_lactante = chapeta
        inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
        inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".lecheria
        inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
	    where "Producciones_leche"."id_Tproduccion"=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_produccion]);
    return respuesta;
  };

/**
 * @description Consulta todos los registros de produccion diaria de leche de una lechería en la base de datos entre dos fechas cualquiera.
 * El objeto debe contener:
 *  - id_lecheria.
 *  - fecha_inicio.
 *  - fecha_fin.
 * @param {Object} lecheria_fechas 
 * @returns 
 */
let consultarLecheriaFecha = async (lecheria_fechas) => {
    let sql = `SELECT "id_Tproduccion", lecheria, fecha, cantidad_dia
	FROM public."Producciones_leche" where lecheria =$1
	and fecha between $2 and $3;`;    
        let values = [
            lecheria_fechas.id_lecheria,
            lecheria_fechas.fecha_inicio,
            lecheria_fechas.fecha_fin];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
  };

  /**
 * @description Consulta la cantidad total de leche producida de una lechería en la base de datos entre dos fechas cualquiera.
 * El objeto debe contener:
 *  - id_lecheria.
 *  - fecha_inicio.
 *  - fecha_fin.
 * @param {Object} lecheria_fechas 
 * @returns 
 */
   let consultarCantidadLecheriaFecha = async (lecheria_fechas) => {
    let sql = `select  lecheria, sum(cantidad_dia)as Litros FROM public."Producciones_leche" where lecheria =$1
	            and fecha between $2 and $3 group by lecheria;`;    
        let values = [
            lecheria_fechas.id_lecheria,
            lecheria_fechas.fecha_inicio,
            lecheria_fechas.fecha_fin];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
  };

/**
 * @description Almacena un nuevo registro de producción de un día y lactante en específico.
 * El objeto debe contener:
 *  - Chapeta bovino lactante
 *  - id de la lechería
 *  - Fecha de la producción
 *  - Cantidad producida
 * @param {Object} lecheria 
 * @returns 
 */
 let insertarProduccion = async (lecheria) => {
    let sql = `CALL public.insertproduccionleche($1,$2,$3,$4);`;

    let values = [
        lecheria.id_bovino,
        arbol.id_lecheria,
        arbol.fecha,
        arbol.cantidad_dia];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un lecheria de la base de datos.
 * @param {String} chapeta 
 * @returns
 */
 const eliminarProduccion = async (chapeta) => {
    let sql = `DELETE FROM public."Producciones_leche"
	            WHERE "id_Tproduccion" = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [chapeta]);
    return respuesta
};

/**
 * @description Modifica la información de una produccion de leche.
 * El objeto debe contener:
 *  - Chapeta bovino lactante
 *  - id de la lechería
 *  - Fecha de la producción
 *  - Cantidad producida
 * @param {Object} produccion 
 * @param {int} id_Tproduccion
 * @returns 
 */
 const editarProduccion = async (produccion, id_Tproduccion) => {
    if (produccion.id_Tproduccion != id_Tproduccion) {
      throw {
        ok: false,
        mensaje: "El id de la produccion no corresponde al enviado",
      };
    }
    let sql =`call updateproduccionleche($1, $2, $3, $4,$5);`;
    let valores = [produccion.id_Tproduccion, produccion.id_lecheria, produccion.fecha, 
        produccion.id_lactante, produccion.cantidad_dia];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports={validarProduccion,consultarProducciones,
    consultarProduccion, insertarProduccion, consultarCantidadLecheriaFecha,
    editarProduccion,eliminarProduccion, consultarLecheriaFecha};

