
const ServicioPG = require("../services/postgres");
let _servicio = new ServicioPG();


 /**
  * @description Se toma el parametro con la información del control de preñéz y se valida:
  *  - Que no sea vacio.
  *  - Que contenga: fecha_palpacion, confirmacion_palpacion, num_parto, id_usuario.
  * @param {Object} control 
  */
let validar = control => {
    if (!control) {
        throw { ok: false, mensaje: "La información del Control de preñez de la vaca es obligatoria" };
    } else if (!control.fecha_palpacion) {
        throw { ok: false, mensaje: "La Fecha de palpacion es obligatoria" };
    }else if (!control.confirmacion_palpacion) {
        throw { ok: false, mensaje: "La confirmacion de la palpacion es obligatoria" };
    }else if (!control.num_parto) {
        throw { ok: false, mensaje: "El  numero de partos que ha tenido es obligatorio" };
    }    else if (!control.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }
};

/**
 * @description Consulta toda la información de los controles de preñéz definidos como existentes en la base de datos.
 * 
 * El criterio para ser definidos como existentes está en tener valores en los campos num_partos y id_usuario.
 * @returns
 */
let consultarControlesPrenez = async () => {
    let sql = `SELECT id_control, "Bovinos".chapeta as id_vaca, "Bovinos".nombre as Vaca, fecha_palpacion, confirmacion_palpacion, 
	fecha_secado, num_parto, "Usuarios".id_usuario as id_usuario, "Usuarios".nombre as Usuario, id_celo
	FROM public."ControlPrenez"
	INNER JOIN public."Bovinos" ON "ControlPrenez".id_vaca = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPrenez".id_usuario = "Usuarios".id_usuario
	where num_parto IS NOT NULL AND "ControlPrenez".id_usuario IS NOT NULL
    AND id_control>0 order by "Bovinos".chapeta asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

/**
 * @description Conslulta un control de preñez definido como existente en la base de datos.
 * 
 * El criterio para ser definido como existente está en tener valores en los campos num_partos y id_usuario.
 * @param {int} id_control 
 * @returns
 */
let consultarControlPrenez = async (id_control) => {
    let sql = `SELECT id_control, "Bovinos".chapeta as id_vaca, "Bovinos".nombre as Vaca, fecha_palpacion, confirmacion_palpacion, 
	fecha_secado, num_parto, "Usuarios".id_usuario as id_usuario, "Usuarios".nombre as Usuario, id_celo
	FROM public."ControlPrenez"
	INNER JOIN public."Bovinos" ON "ControlPrenez".id_vaca = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPrenez".id_usuario = "Usuarios".id_usuario
	where id_control=$1 and num_parto IS NOT NULL AND "ControlPrenez".id_usuario IS NOT NULL;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_control]);
    return respuesta;
};

/**
 * @description Consulta toda la información de los controles de preñéz definidos como no existentes en la base de datos.
 * 
 * El criterio para ser definidos como no existentes está en no tener valores en los campos num_partos y id_usuario.
 * @returns
 */
let consultarNoCreados = async ()=>{
    let sql = `SELECT id_control, "Bovinos".chapeta as id_vaca, "Bovinos".nombre as Vaca,  
                fecha_secado, id_celo
                FROM public."ControlPrenez"
                INNER JOIN public."Bovinos" ON "ControlPrenez".id_vaca = "Bovinos".chapeta
                where num_parto IS NULL AND "ControlPrenez".id_usuario IS NULL
                AND id_vaca>0 order by id_vaca asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
}

/**
 * @description Modifica la información de un control de celo.
 * Las modificaciones pueden realizarse únicamente sobre los campos:
 *  - fecha_palpacion.
 *  - confirmacion_palpacion.
 *  - num_parto.
 *  - id_usuario.
 * 
 * Debido a que los otros campos depenten de un control de celo.
 * @param {Object} control 
 * @param {int} id_control
 * @returns 
 */
let actualizarControlPrenez = async (control, id_control) => {
    if (control.id_control != id_control) {
        throw {
            ok: false,
            mensaje: "El id del control de preñez no corresponde al enviado",
        };
    }
    let sql = `UPDATE public."ControlPrenez"
	SET  fecha_palpacion=$1, confirmacion_palpacion=$2, 
    num_parto=$3, id_usuario=$4 WHERE id_control=$5;`;
    let values = [
        control.fecha_palpacion,
        control.confirmacion_palpacion,
        control.num_parto,
        control.id_usuario,
        id_control
    ];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

module.exports = { validar, 
    consultarControlesPrenez, actualizarControlPrenez, 
 consultarControlPrenez, consultarNoCreados};
