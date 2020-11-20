
const ServicioPg = require("../services/postgres");
const _service = new ServicioPg();

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

  let consultarUsuario = async (usuario) => {
    
    let sql = `SELECT * FROM public."Usuarios" WHERE correo = $1 AND contrasena = md5($2)`;
    let valores = [usuario.correo, usuario.clave]
    let respuesta = await _service.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports = {validarLogin, consultarUsuario};