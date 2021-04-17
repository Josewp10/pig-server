/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para autenticar a los usuarios y dar acceso al sistema
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPg = require("../services/postgres");
const _service = new ServicioPg();
const jwt = require("jsonwebtoken");


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
      if (!usuario.contrasena) {
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
    let valores = [usuario.correo, usuario.contrasena]
    let respuesta = await _service.ejecutarSql(sql, valores);
    return respuesta;
  };
  let generar_token = (usuario) => {
    delete usuario.contrasena;
    let token = jwt.sign(usuario, process.env.SECRET_KEY, { expiresIn: "4h" });
    return token;
  };
  
  let descifrar_token = (token) => {
    return jwt.decode(token, process.env.SECRET_KEY);
  };
  let validar_token = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  };

module.exports = {validarLogin, 
                  consultarUsuario, 
                  generar_token,
                  descifrar_token,
                  validar_token};