
const ServicioPG = require("../services/postgres");
let _servicio = new ServicioPG();


/**
  * @description Se toma el parametro con la información del control de partos y se valida:
  *  - Que no sea vacio.
  *  - Que contenga:  id_bovino, fecha_parto, pesaje, observaciones, id_tipo, id_bovino_genealogico, id_usuario
  * @param {Object} partos
  */
 let validar = partos => {
    if (!partos) {
        throw { ok: false, mensaje: "La información del Control de parto z de la vaca es obligatoria" };
    }else if (!partos.id_bovino) {
        throw { ok: false, mensaje: "El  id del bovino  es obligatorio" };
    }    else if (!partos.fecha_parto) {
        throw { ok: false, mensaje: "La fecha de parto  es obligatorio" };
    } else if (!partos.pesaje) {
        throw { ok: false, mensaje: "El pesaje del bovino es obligatorio" };
    } else if (!partos.id_tipo) {
        throw { ok: false, mensaje: "El Id del tipo es obligatorio" };
    }else if (!partos.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }

};


/**
 * @description Consulta toda la información de control de parto definidos como existentes en la base de datos.
 * 
 * El criterio para ser definidos como existentes está en tener valores en los campos id_parto, id_bovino, fecha_parto, 
 * pesaje, observaciones, id_tipo, id_bovino_genealogico, id_usuario
 * @returns
 */
 let consultarControlPartos = async () => {
    let sql = `SELECT id_parto, "ControlPartos".id_bovino, "Bovinos".nombre as "Bovino", 
	fecha_parto, pesaje, observaciones, "TiposBovinos".nombre as "Tipo Bovino", 
	"Genealogicos"."id_Tgenealogico", "ControlPartos".id_usuario, "Usuarios".nombre as "Usuario"
	FROM public."ControlPartos"
	INNER JOIN public."Bovinos" ON "ControlPartos".id_bovino = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPartos".id_usuario = "Usuarios".id_usuario
	INNER JOIN public."TiposBovinos" ON "ControlPartos".id_tipo = "TiposBovinos".id_tipo
	INNER JOIN public."Genealogicos" 
	ON "ControlPartos".id_bovino_genealogico = "Genealogicos".id_bovino;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};


/**
 * @description Consulta un control de parto definido como existente en la base de datos.
 * 
 * El criterio para ser definido como existente está en tener valores en los campos num_lactantes y id_usuario.
 * @param {int} id_parto 
 * @returns
 */
 let consultarControlParto = async (id_parto) => {
    let sql = `SELECT id_parto, "ControlPartos".id_bovino, "Bovinos".nombre as "Bovino", 
	fecha_parto, pesaje, observaciones, "TiposBovinos".nombre as "Tipo Bovino", 
	"Genealogicos"."id_Tgenealogico", "ControlPartos".id_usuario, "Usuarios".nombre as "Usuario"
	FROM public."ControlPartos"
	INNER JOIN public."Bovinos" ON "ControlPartos".id_bovino = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPartos".id_usuario = "Usuarios".id_usuario
	INNER JOIN public."TiposBovinos" ON "ControlPartos".id_tipo = "TiposBovinos".id_tipo
	INNER JOIN public."Genealogicos" 
	ON "ControlPartos".id_bovino_genealogico = "Genealogicos".id_bovino
    where id_parto=$1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_parto]);
    return respuesta;
};

/**
 * @description Almacena una nueva lecheria en la base de datos.
 * @param {Object} parto
 * @returns 
 */
 const guardarControlParto = async (parto) => {
    let sql = `CALL public.insertparto($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11)`;
    let valores = [parto.id_bovino, parto.id_tipo, parto.nombre, parto.id_raza, parto.finca,
     parto.fecha_parto, parto.pesaje, parto.observaciones, parto.id_mama, parto.id_papa, parto.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

/**
 * @description Modifica la información de un control de parto.
 * Debido a que los otros campos dependen de un parto
 * @param {Object} parto 
 * @param {int} id_parto
 * @returns 
 */
 let actualizarControlParto = async (parto, id_parto) => {
    if (parto.id_parto != id_parto) {
        throw {
            ok: false,
            mensaje: "El control de parto no corresponde al enviado",
        };
    }
    let sql = `UPDATE public."ControlPartos"
	SET   fecha_parto=$1, pesaje=$2, observaciones=$3, id_usuario=$4
	 WHERE id_parto=$5;`;
    let values = [
        parto.id_bovino,
        parto.fecha_parto,
        parto.pesaje,
        parto.observaciones,
        parto.id_tipo,
        parto.id_usuario,
        id_parto
    ];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un control de partos  de la base de datos.
 * @param {String} parto 
 * @returns
 */
 const eliminarControlParto = async (id_parto) => {
    let sql = `DELETE FROM public."ControlPartos" where id_parto = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_parto]);
    return respuesta
};


module.exports = { validar, 
    consultarControlPartos, actualizarControlParto, 
 consultarControlParto, guardarControlParto, eliminarControlParto};
