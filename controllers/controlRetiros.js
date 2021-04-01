/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de controles de retiro
 */


//Llamado a todas las librerías, servicios y controladores requeridos
const ServicioPG = require("../services/postgres");
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información del control de retiro y se valida:
 *  - Que no sea vacío
 *  - Que contenga los campos: hora_ingreso, fecha_ingreso, fecha_salida, num_ordenos_descartar, observaciones, id_bovino, id_usuario, id_tipo.
 * @param {Object} control 
 */
let validar = control => {
    if (!control) {
        throw { ok: false, mensaje: "La información del Control del Retiro de Leche es obligatoria" };
    } else if (!control.hora_ingreso) {
        throw { ok: false, mensaje: "La Hora de Ingreso es obligatoria" };
    } else if (!control.fecha_ingreso) {
        throw { ok: false, mensaje: "La Fecha de Ingreso es obligatoria" };
    } else if (!control.fecha_salida) {
        throw { ok: false, mensaje: "La Fecha de Salida es obligatoria" };
    } else if (!control.num_ordenos_descartar) {
        throw { ok: false, mensaje: "El Número de Ordeños a Descartar es obligatorio" };
    } else if (!control.observaciones) {
        throw { ok: false, mensaje: "Las Observaciones son Obligatorias" };
    } else if (!control.id_bovino) {
        throw { ok: false, mensaje: "El Id del bovino es obligatorio" };
    }
    else if (!control.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }else if (!control.id_tipo) {
        throw { ok: false, mensaje: "El Id del tipo de control es obligatorio" };
    }
};

/**
 * @description Consulta la información de todos los controles de retiro en la base de datos.
 * @returns 
 */
let consultarControlesRetiro = async () => {
    let sql = `SELECT "ControlRetiros".id_retiro, "ControlRetiros".hora_ingreso, "ControlRetiros".fecha_ingreso, 
            "ControlRetiros".fecha_salida, "ControlRetiros".num_ordenos_descartar, 
            "ControlRetiros".observaciones, "Bovinos".nombre as Bovino, "Usuarios".nombre as Usuario,
            "TiposRetiros".nombre as "Tipo retiro"
            FROM public."ControlRetiros"
            INNER JOIN public."Bovinos" ON "ControlRetiros".id_bovino = "Bovinos"."chapeta"
            INNER JOIN public."Usuarios" ON "ControlRetiros".id_usuario = "Usuarios"."id_usuario"
            INNER JOIN public."TiposRetiros" ON "ControlRetiros".id_tipo = "TiposRetiros"."id_tipo"
            ORDER BY id_retiro ASC;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

/**
 * @description Conculta toda la información de un control de retiro en específico de la base de datos.
 * @param {int} id_retiro 
 * @returns 
 */
let consultarControlRetiro = async (id_retiro) => {
    let sql = `SELECT "ControlRetiros".id_retiro, "ControlRetiros".hora_ingreso, "ControlRetiros".fecha_ingreso, 
            "ControlRetiros".fecha_salida, "ControlRetiros".num_ordenos_descartar, 
            "ControlRetiros".observaciones, "Bovinos".nombre as Bovino, "Usuarios".nombre as Usuario,
            "TiposRetiros".nombre as "Tipo retiro"
            FROM public."ControlRetiros"
            INNER JOIN public."Bovinos" ON "ControlRetiros".id_bovino = "Bovinos"."chapeta"
            INNER JOIN public."Usuarios" ON "ControlRetiros".id_usuario = "Usuarios"."id_usuario"
            INNER JOIN public."TiposRetiros" ON "ControlRetiros".id_tipo = "TiposRetiros"."id_tipo"
            where id_retiro = $1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_retiro]);
    return respuesta;
};

/**
 * @description Almacena un control de celo en la base de datos.
 * @param {Object} control 
 * @returns 
 */
let insertarControlRetiro = async (control) => {
    let sql = `INSERT INTO public."ControlRetiros" (
    hora_ingreso, fecha_ingreso, fecha_salida, num_ordenos_descartar, 
    observaciones, id_bovino, id_usuario, id_tipo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )`;

    let values = [
        control.hora_ingreso,
        control.fecha_ingreso,
        control.fecha_salida,
        control.num_ordenos_descartar,
        control.observaciones,
        control.id_bovino,
        control.id_usuario,
        control.id_tipo];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina un control de retiro de la base de datos.
 * @param {int} id_retiro 
 * @returns 
 */
let eliminarControlRetiro = async (id_retiro) => {
    let sql = `DELETE FROM public."ControlRetiros" WHERE id_retiro = $1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_retiro]);
    return respuesta;
};

/**
 * @description Actualiza la información de un control de retiro en la base de datos. 
 * @param {Object} control 
 * @param {int} id_retiro 
 * @returns 
 */
let actualizarControlRetiro = async (control, id_retiro) => {
    if (control.id_retiro != id_retiro) {
        throw {
            ok: false,
            mensaje: "El id del control de retiro no corresponde al enviado",
        };
    }
    let sql = `UPDATE public."ControlRetiros"
            SET hora_ingreso=$1, fecha_ingreso=$2, fecha_salida=$3, num_ordenos_descartar=$4, 
            observaciones=$5, id_bovino=$6, id_usuario=$7, id_tipo=$8
            WHERE id_retiro=$9`;
    let values = [
        control.hora_ingreso,
        control.fecha_ingreso,
        control.fecha_salida,
        control.num_ordenos_descartar,
        control.observaciones,
        control.id_bovino,
        control.id_usuario,
        id_retiro
    ];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

module.exports = { validar, insertarControlRetiro, 
    consultarControlesRetiro, actualizarControlRetiro, 
    eliminarControlRetiro, consultarControlRetiro };