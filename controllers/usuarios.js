/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de usuarios
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información del usuario de dosis y se valida:
 *  - Que no sea vacío
 *  - Que contenga los campos: nombre, correo, celular, id_tipo.
 * @param {Object} usuario 
 */
const validarUsuario = usuario => {
    if (!usuario) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del usuario'
        };
    }else if(!usuario.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese la cedula del usuario'
        };
    }else if(!usuario.nombre){
        throw{
            ok: false,
            mensaje: 'Ingrese el nombre del usuario'
        };
    }else if(!usuario.correo){
        throw{
            ok: false,
            mensaje: 'Ingrese el correo electronico del usuario'
        };
    }else if(!usuario.celular){
        throw{
            ok: false,
            mensaje: 'Ingrese el numero celular del usuario'
        };
    }else if(!usuario.id_tipo){
        throw{
            ok: false,
            mensaje: 'seleccione el tipo de usuario'
        };
   
    }
};

/**
 * @description Consulta la información de todos los usuarios registrados en la base de datos.
 * @returns 
 */
const consultarUsuarios = async () => {
    let sql = `SELECT "Usuarios"."id_Tusuario", "Usuarios".id_usuario, "Usuarios".nombre as "Usuario", 
        "Usuarios".correo, "Usuarios".celular, "Usuarios".id_tipo, "TiposUsuarios".nombre as "Rol"
        FROM public."Usuarios"
        INNER JOIN public."TiposUsuarios" 
        ON public."Usuarios".id_tipo = "TiposUsuarios"."id_tipo";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

const consultarUsuariosNombreyId = async () => {
    let sql = `SELECT  "Usuarios".id_usuario, "Usuarios".nombre
        FROM public."Usuarios";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Consulta la información de un usuario en la base de datos.
 * @param {int} id_usuario 
 * @returns 
 */
const consultarUsuario = async (id_usuario) => {
    let sql = `SELECT "Usuarios"."id_Tusuario", "Usuarios".id_usuario, "Usuarios".nombre as "Usuario", 
        "Usuarios".correo, "Usuarios".celular, "Usuarios".id_tipo, "TiposUsuarios".nombre as "Rol"
        FROM public."Usuarios"
        INNER JOIN public."TiposUsuarios" 
        ON public."Usuarios".id_tipo = "TiposUsuarios"."id_tipo"
		where "Usuarios".id_usuario = $1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_usuario]);
    return respuesta;
};

/**
 * @description Consulta el número de celulat de un usuario específico en la base de datos.
 * @param {int} id_usuario 
 * @returns 
 */
const consultarCelUsuario = async (id_usuario) => {
    let sql = `SELECT celular
	            FROM public."Usuarios" where id_usuario = $1 ;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id_usuario]);
    return respuesta;
};

/**
 * @description Almacena la información de un usuario en la base de datos.
 * @param {Object} usuario 
 * @returns 
 */
const guardarUsuario = async (usuario) => {
    
    let sql = `INSERT INTO public."Usuarios"(
        id_usuario,  nombre, celular, id_tipo, correo, contrasena)
        VALUES ($1, $2, $3, $4, $5, md5($6) );`;
    let valores = [usuario.id_usuario, usuario.nombre,
                    usuario.celular, usuario.id_tipo, 
                    usuario.correo, usuario.contrasena];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
};

/**
 * @description Modifica la información de un usuario.
 * @param {Object} usuario 
 * @param {String} id_usuario
 * @returns 
 */
 const editarUsuario = async (usuario, id_usuario) => {
    if (usuario.id_usuario != id_usuario) {
      throw {
        ok: false,
        mensaje: "El id del usuario no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."Usuarios"
      SET nombre=$1, celular=$2, id_tipo=$3, correo=$4
      WHERE id_usuario=$5;`;
    let valores = [usuario.nombre, usuario.celular, usuario.id_tipo, 
      usuario.correo, usuario.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

/**
 * @description Modifica la contraseña de un usuario.
 * @param {Object} usuario 
 * @param {String} id_usuario
 * @returns 
 */
 const editarContrasena = async (usuario, id_usuario) => {
    if (usuario.id_usuario != id_usuario) {
      throw {
        ok: false,
        mensaje: "El id del usuario no corresponde al enviado",
      };
    }
    let sql =`UPDATE public."Usuarios"
            SET contrasena=md5($1)
            WHERE  id_usuario=$2;`;
    let valores = [usuario.contrasena, usuario.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  };

/**
 * @description Elimina un usuario de la base de datos.
 * @param {String} id_usuario 
 * @returns
 */
 const eliminarUsuario = async (id_usuario) => {
    let sql = `DELETE FROM public."Usuarios" where id_usuario = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_usuario]);
    return respuesta;
};

module.exports = {validarUsuario, consultarUsuario, consultarUsuarios,
     consultarCelUsuario, consultarUsuariosNombreyId ,editarContrasena,
     guardarUsuario, editarUsuario, eliminarUsuario};