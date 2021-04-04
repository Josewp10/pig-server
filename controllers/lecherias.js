const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información la lecheria y se valida:
 *  - Que no sea vacio
 *  - Que contenga: id_bovino,fecha, id_lecheria, cantidad_dia, id_usuario
 * @param {Object} arbol 
 */
const validarLecheria = lecheria => {
    if (!lecheria) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!lecheria.id_bovino){
        throw{
            ok: false,
            mensaje: 'Ingrese el la chapeta de la lactante'
        };
    }else if(!lecheria.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de la producción'
        };
    }else if(!lecheria.id_lecheria){
        throw{
            ok: false,
            mensaje: 'Ingrese el id de la lecheria'
        };
    }else if(!lecheria.cantidad_dia){
        throw{
            ok: false,
            mensaje: 'Ingrese la cantidad producida en éste día'
        };
    }else if(!lecheria.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese el id del usuario'
        };
    }
};

/**
 * @description Consulta todos los registros las lecherias en la base de datos.
 * @returns 
 */
const consultarLecherias = async () => {    
    let sql =  `SELECT "Lecheria_Lactante"."id_Tlecheria",lecheria, "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Lecheria_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Lecherias" on "Lecheria_Lactante"."id_Tlecheria" = "Lecherias"."id_Tlecheria"
	inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};
let consultarLecheria = async (id_) => {
    let sql = `SELECT "Lecheria_Lactante"."id_Tlecheria",lecheria, "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Lecheria_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Lecherias" on "Lecheria_Lactante"."id_Tlecheria" = "Lecherias"."id_Tlecheria"
	inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
	where "Lecherias"."id_Tlecheria"=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta;
  };

/**
 * @description Almacena un nuevo registro genealógico en la base de datos.
 * @param {Object} lecheria 
 * @returns 
 */
 let insertarLecheria = async (lecheria) => {
    let sql = `INSERT INTO CALL public.insertlecheria($1,$2,$3,$4,$5);`;

    let values = [
        lecheria.id_bovino,
        arbol.id_lecheria,
        arbol.fecha,
        arbol.cantidad_dia,
        arbol.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};



module.exports={validarLecheria,consultarLecherias, consultarLecheria, insertarLecheria};

