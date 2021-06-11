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
    }else if(!produccion.id_lecheria){
        throw{
            ok: false,
            mensaje: 'Ingrese el id de la lecheria'
        };
    }else if(!produccion.cantidad_dia){
        throw{
            ok: false,
            mensaje: 'Ingrese la cantidad producida en éste día'
        };
    }
};

/**
 * @description Consulta todos los registros de produccion diaria de leche  de todas las lecherías en la base de datos.
 * @returns 
 */
const consultarProducciones = async () => {    
    let sql =  `SELECT "Produccion_Lactante"."id_Tproduccion","Producciones_leche".id_lecheria,"Produccion_Lactante".id_lactante,
    "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre as Encargado
    FROM public."Produccion_Lactante"
    inner join public."Bovinos" on id_lactante = chapeta
    inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
    inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".id_lecheria
    inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
    where "Producciones_leche"."id_Tproduccion" >0
	order by "Producciones_leche"."id_Tproduccion" asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Consulta todos los registros de produccion diaria de leche de una lechería en la base de datos.
 * @param {int} lecheria 
 * @returns 
 */
let consultarProduccion = async (lecheria) => {
    let sql = `SELECT "Produccion_Lactante"."id_Tproduccion","Producciones_leche".id_lecheria,"Produccion_Lactante".id_lactante,
        "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre as Encargado
        FROM public."Produccion_Lactante"
        inner join public."Bovinos" on id_lactante = chapeta
        inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
        inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".id_lecheria
        inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
	    where "Producciones_leche".id_lecheria=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [lecheria]);
    return respuesta;
  };


  /**
 * @description Consulta un registro especifico de produccion de leche en la base de datos.
 * @param {int} id_Tproduccion 
 * @returns 
 */
let consultarProduccionId = async (id_Tproduccion) => {
    let sql = `SELECT "Produccion_Lactante"."id_Tproduccion","Producciones_leche".id_lecheria,
    "Produccion_Lactante".id_lactante,"Bovinos".nombre, 
    fecha, cantidad_dia, "Usuarios".nombre Encargado
    FROM public."Produccion_Lactante"
    inner join public."Bovinos" on id_lactante = chapeta
    inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
    inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".id_lecheria
    inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
    where "Producciones_leche"."id_Tproduccion"=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_Tproduccion]);
    return respuesta;
  };

/**
 * @description Consulta todos los registros de produccion diaria de leche de una lechería en la base de datos entre dos fechas cualquiera.
 * El objeto debe contener:
 *  - id_lecheria.
 *  - fecha_inicio.
 *  - fecha_fin.
 * @param {int} id_lecheria 
 * @param {Date} fecha_inicio
 *  @param {Date} fecha_fin
 * @returns 
 */
let consultarLecheriaFecha = async (id_lecheria, fecha_inicio, fecha_fin) => {
    let sql = `SELECT "Produccion_Lactante"."id_Tproduccion","Producciones_leche".id_lecheria,
	"Produccion_Lactante".id_lactante,
    "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre Encargado
    FROM public."Produccion_Lactante"
    inner join public."Bovinos" on id_lactante = chapeta
    inner join public."Producciones_leche" on "Produccion_Lactante"."id_Tproduccion" = "Producciones_leche"."id_Tproduccion"
    inner join public."Lecherias" on "Lecherias".id_lecheria="Producciones_leche".id_lecheria
    inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
    where "Producciones_leche".id_lecheria=$1 and fecha between $2 and $3
    order by "Producciones_leche"."id_Tproduccion" asc;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria,fecha_inicio,fecha_fin]);
    return respuesta;
  };

  /**
 * @description Consulta la cantidad total de leche producida de una lechería en la base de datos entre dos fechas cualquiera.
 * El objeto debe contener:
 *  - id_lecheria.
 *  - fecha_inicio.
 *  - fecha_fin.
 * @param {int} id_lecheria 
 * @param {Date} fecha_inicio
 *  @param {Date} fecha_fin
 * @returns 
 */
   let consultarCantidadLecheriaFecha = async (id_lecheria, fecha_inicio, fecha_fin) => {
    let sql = `select  id_lecheria, sum(cantidad_dia)as Litros 
            FROM public."Producciones_leche" 
            where id_lecheria =$1 and fecha between $2 and $3
            group by id_lecheria;`;    
    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria,fecha_inicio,fecha_fin]);
    return respuesta;
  };

/**
 * @description Almacena un nuevo registro de producción de un día y lactante en específico.
 * El objeto debe contener:
 *  - Chapeta bovino lactante
 *  - id de la lechería
 *  - Fecha de la producción
 *  - Cantidad producida
 * @param {Object} infolecheria 
 * @returns 
 */
 let insertarProduccion = async (infolecheria) => {
    let sql = `CALL public.insertproduccionleche($1,$2,$3,$4);`;

    let values = [
        infolecheria.id_bovino,
        infolecheria.id_lecheria,
        infolecheria.fecha,
        infolecheria.cantidad_dia];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un lecheria de la base de datos.
 * @param {String} id 
 * @returns
 */
 const eliminarProduccion = async (id) => {
    let sql = `DELETE FROM public."Producciones_leche"
	            WHERE "id_Tproduccion" = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id]);
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
    let valores = [produccion.id_Tproduccion, produccion.lecheria, produccion.fecha, produccion.id_bovino, produccion.cantidad_dia];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports={validarProduccion,consultarProducciones,
    consultarProduccion,consultarProduccionId, insertarProduccion, consultarCantidadLecheriaFecha,
    editarProduccion,eliminarProduccion, consultarLecheriaFecha};

