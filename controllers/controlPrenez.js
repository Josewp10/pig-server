
const ServicioPG = require("../services/postgres");
let _servicio = new ServicioPG();


let validar = control => {
    if (!control) {
        throw { ok: false, mensaje: "La información del Control de preñez de la vaca es obligatoria" };
    } else if (!control.id_vaca) {
        throw { ok: false, mensaje: "La chapeta de Ingreso es obligatoria" };
    } else if (!control.fecha_palpacion) {
        throw { ok: false, mensaje: "La Fecha de palpacion es obligatoria" };
    } else if (!control.fecha_posible_parto) {
        throw { ok: false, mensaje: "La Fecha de posible parto es obligatoria" };
    } else if (!control.confirmacion_palpacion) {
        throw { ok: false, mensaje: "La confirmacion de la palpacion es obligatoria" };
    } else if (!control.fecha_secado) {
        throw { ok: false, mensaje: "La fecha del secadp es Obligatoria" };
    } else if (!control.num_parto) {
        throw { ok: false, mensaje: "El  numero de partos que ha tenido es obligatorio" };
    }
    else if (!control.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }else if (!control.id_celo) {
        throw { ok: false, mensaje: "El Id del celo es obligatorio" };
    }
};


let consultarControlesPrenez = async () => {
    let sql = `SELECT id_control, "Bovinos".nombre as Vaca, fecha_palpacion, confirmacion_palpacion, 
	fecha_secado, num_parto, "Usuarios".nombre as Usuario, id_celo
	FROM public."ControlPrenez"
	INNER JOIN public."Bovinos" ON "ControlPrenez".id_vaca = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPrenez".id_usuario = "Usuarios".id_usuario;	`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};


let consultarControlPrenez = async (id_control) => {
    let sql = `SELECT id_control, "Bovinos".nombre as Vaca, fecha_palpacion, confirmacion_palpacion, 
	fecha_secado, num_parto, "Usuarios".nombre as Usuario, id_celo
	FROM public."ControlPrenez"
	INNER JOIN public."Bovinos" ON "ControlPrenez".id_vaca = "Bovinos".chapeta
	INNER JOIN public."Usuarios" ON "ControlPrenez".id_usuario = "Usuarios".id_usuario
    where id_control = $1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_control]);
    return respuesta;
};


let actualizarControlPrenez = async (control, id_control) => {
    if (control.id_control != id_control) {
        throw {
            ok: false,
            mensaje: "El id del control de preñez no corresponde al enviado",
        };
    }
    let sql = `UPDATE public."ControlPrenez"
	SET  id_vaca=$1, fecha_palpacion=$2, confirmacion_palpacion=$3, 
    num_parto=$4, id_usuario=$5, WHERE id_control=$6`;
    let values = [
        control.id_vaca,
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
 consultarControlPrenez };