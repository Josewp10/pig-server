const ServicioPG = require("../services/postgres");

let validar = control => {
    if (!control) {
        throw { ok: false, mensaje: "La información del Control del Retiro de Leche es obligatoria" };
    } else if (!control.hora_ingreso) {
        throw { ok: false, mensaje: "La Hora de Ingreso es obligatoria" };
    } else if (!control.fecha_ingreso) {
        throw { ok: false, mensaje: "El Fecha de Ingreso es obligatoria" };
    } else if (!control.fecha_salida) {
        throw { ok: false, mensaje: "El Fecha de Salida es obligatoria" };
    } else if (!control.num_ordenos_descartar) {
        throw { ok: false, mensaje: "El Número de Ordeños a Descartar es obligatorio" };
    } else if (!control.observaciones) {
        throw { ok: false, mensaje: "Las Observaciones son Obligatorias" };
    } else if (!control.id_bovino) {
        throw { ok: false, mensaje: "El Id del bovino es obligatorio" };
    }
    else if (!control.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }
};

let consultarControlRetiro = async () => {
    let _servicio = new ServicioPG();
    let sql = `SELECT "ControlRetiros".id_retiro, "ControlRetiros".hora_ingreso, "ControlRetiros".fecha_ingreso, "ControlRetiros".fecha_salida, "ControlRetiros".num_ordenos_descartar, "ControlRetiros".observaciones, "Bovinos".nombre, "Usuarios".nombre, "Medicamentos".horas_retiro_leche
	FROM public."ControlRetiros"
	INNER JOIN public."Bovinos" ON "ControlRetiros".id_bovino = "Bovinos"."id_Tbovinos"
	INNER JOIN public."Usuarios" ON "ControlRetiros".id_usuario = "Usuarios"."id_Tusuario"
	INNER JOIN public."Retiros_Medicamentos" ON "ControlRetiros".id_retiro = "Retiros_Medicamentos"."id_retiro" 
	INNER JOIN public."Medicamentos" ON "Retiros_Medicamentos".id_medicamento = "Medicamentos"."id_Tmedicamento";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};


let insertarControlRetiro = async (control) => {
    let _servicio = new ServicioPG();
    let sql = `INSERT INTO public."ControlRetiros" (
        id_retiro, hora_ingreso, fecha_ingreso, fecha_salida, num_ordenos_descartar, observaciones, id_bovino, id_usuario)
       VALUES (
           '${control.hora_ingreso}',
           '${control.fecha_ingreso}',
           '${control.fechaSalida}',
           '${control.num_ordenos_descartar}',
           '${control.observaciones}',
           '${control.id_bovino}',
           '${control.id_usuario}');`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

module.exports = { validar, insertarControlRetiro, consultarControlRetiro }