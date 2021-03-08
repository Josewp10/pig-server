/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para autenticar a los usuarios y dar acceso al sistema
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPg = require("../services/postgres");
const _service = new ServicioPg();


 /**
  * @description Se toma el parametro con la información del usuario y se valida:
  *  - Que no sea vacio
  *  - Que contenga el e-mail y la contraseña
  * @param {Object} usuario 
  */
let validarLogin = (usuario) => {
    if (!usuario) {
        throw {
          ok: false,
          message: "La información es obligatoria.",
        };
      }   
      if (!usuario.correo) {
        throw { ok: false, message: "El correo es obligatrio." };
      }
      if (!usuario.clave) {
        throw { ok: false, message: "La clave es obligatoria." };
      }
  };

/**
 * @description Verifica si hay un usuario registrado en la base de dados
 * @param {Object} usuario
 * @returns
 */
  let consultarUsuario = async (usuario) => {
    
    let sql = `SELECT * FROM public."Usuarios" WHERE correo = $1 AND contrasena = md5($2)`;
    let valores = [usuario.correo, usuario.clave]
    let respuesta = await _service.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports = {validarLogin, consultarUsuario};