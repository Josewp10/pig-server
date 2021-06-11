
const ServicioPG = require("../services/postgres");
let _servicio = new ServicioPG();


 /**
  * @description Se toma el parametro con la información de lecheria y se valida:
  *  - Que no sea vacio.
  *  - Que contenga:  num_lactantes, id_usuario.
  * @param {Object} lecheria
  */
let validar = lecheria => {
    if (!lecheria) {
        throw { ok: false, mensaje: "La información del Control de preñez de la vaca es obligatoria" };
    }else if (!lecheria.num_lactantes) {
        throw { ok: false, mensaje: "El  numero lactantes que ha tenido es obligatorio" };
    }    else if (!lecheria.id_usuario) {
        throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
    }
};

/**
 * @description Consulta toda la información de las lecherias definidos como existentes en la base de datos.
 * 
 * El criterio para ser definidos como existentes está en tener valores en los campos num_lactantes y id_usuario.
 * @returns
 */
let consultarLecherias = async () => {
    let sql = `SELECT id_lecheria, num_lactantes, "Usuarios".nombre as Usuario
            FROM public."Lecherias"
            INNER JOIN public."Usuarios" ON "Lecherias".id_usuario = "Usuarios".id_usuario
            where id_lecheria > 0
            order by id_lecheria asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

/**
 * @description Consulta una lecheria definida como existente en la base de datos.
 * 
 * El criterio para ser definido como existente está en tener valores en los campos num_lactantes y id_usuario.
 * @param {int} id_lecheria 
 * @returns
 */
let consultarLecheria = async (id_lecheria) => {
    let sql = `SELECT id_lecheria, num_lactantes, "Usuarios".nombre as Usuario
	FROM public."Lecherias"
	INNER JOIN public."Usuarios" ON "Lecherias".id_usuario = "Usuarios".id_usuario
    where id_lecheria=$1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta;
};


/**
 * @description Almacena una nueva lecheria en la base de datos.
 * @param {Object} lecheria
 * @returns 
 */
const guardarLecheria = async (lecheria) => {
    let sql = `INSERT INTO public."Lecherias"(
       num_lactantes, id_usuario) VALUES ($1,$2);`;
    let valores = [
        lecheria.num_lactantes,
        lecheria.id_usuario
                  ];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


/**
 * @description Modifica la información de una lecheria.
 * Las modificaciones pueden realizarse únicamente sobre los campos:
 *  - num_lecheria.
 *  - id_usuario.
 * 
 * Debido a que los otros campos dependen de una lecheria
 * @param {Object} lecheria 
 * @param {int} id_lecheria
 * @returns 
 */
let actualizarLecheria = async (lecheria, id_lecheria) => {
    if (lecheria.id_lecheria != id_lecheria) {
        throw {
            ok: false,
            mensaje: "La lecheria no corresponde al enviado",
        };
    }
    let sql = `UPDATE public."Lecherias"
	SET  num_lactantes=$1, id_usuario=$2 WHERE id_lecheria=$3;`;
    let values = [
       
        lecheria.num_lactantes,
        lecheria.id_usuario,
        id_lecheria
    ];
    let respuesta = await _servicio.ejecutarSql(sql, values);
    return respuesta;
};

/**
 * @description Elimina una lecheria de la base de datos.
 * @param {String} lecheria 
 * @returns
 */
 const eliminarLecheria = async (id_lecheria) => {
    let sql = `DELETE FROM public."Lecherias" where id_lecheria = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta
};


module.exports = { validar, 
    consultarLecherias, actualizarLecheria, 
 consultarLecheria, guardarLecheria, eliminarLecheria};
