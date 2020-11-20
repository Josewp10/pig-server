const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

const validarTarea = tarea => {
    if (!tarea) {
        throw{
            ok: false,
            mensaje: 'Ingrese la Tarea o evento a realizar'
        };
    }else if(!tarea.id_tarea){
        throw{
            ok: false,
            mensaje: 'Ingrese la tarea'
        };
    }else if(!tarea.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese el usuario'
        };
    }else if(!tarea.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha'
        };
    }
};

//Trae todos las tarea registradas
const consultarTarea = async (tarea) => {    
    let sql = `SELECT id_registro, "Tareas".nombre as Tareas, "Usuarios".nombre as usuario, fecha
	FROM public."RegistroTareas"
	 INNER JOIN public."Tareas" ON "RegistroTareas".id_tarea= "Tareas"."id_tarea"
    INNER JOIN public."Usuarios" ON "RegistroTareas".id_usuario = "Usuarios"."id_Tusuario"
    ORDER BY id_registro ASC;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

let consultarTareas = async (id_registro) => {
    let sql = `SELECT id_registro, id_tarea, id_usuario, fecha
	FROM public."RegistroTareas"
      WHERE id_registro = $1 `;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_registro]);
    return respuesta;
  };



//Inserta tareas en la base de datos
const guardarTarea = async (tarea) => {
  
    let sql = `INSERT INTO public."RegistroTareas"(
       id_tarea, id_usuario, fecha)
                values($1,$2,$3);`;
    let valores = [tarea.id_tarea, tarea.id_usuario, tarea.fecha];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

//Elimina tareas  de la base de datos
const eliminarTarea = async (tarea) => {
    let sql = `DELETE FROM public."RegistroTareas" where id_registro = $1`;    
    let respuesta = await _servicio.ejecutarSql(sql, [tarea]);
    return respuesta
};

//Actualiza la información de un bovino
const editarTarea = async (tarea, id_registro) => {
    if (tarea.id_registro != id_registro) {
      throw {
        ok: false,
        mensaje: "El id de la tarea no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."RegistroTareas" SET id_tarea=$1, id_usuario=$2, fecha=$3 WHERE id_registro=$4;`;
    let valores = [tarea.id_tarea, tarea.id_usuario, tarea.fecha, id_registro];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };
  

module.exports = {validarTarea, consultarTarea, consultarTareas, guardarTarea, eliminarTarea, editarTarea};