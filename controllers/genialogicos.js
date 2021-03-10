/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para autenticar a los usuarios y dar acceso al sistema
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPg = require("../services/postgres");
const _service = new ServicioPg();


let consultarGenialogicos = ()=>{
    let sql = ``
    
}

module.exports = {validarLogin, consultarUsuario};