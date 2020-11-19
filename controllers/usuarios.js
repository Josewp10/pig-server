const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();
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

//Trae todos los usuario registrados
const consultarUsuario = async (usuario) => {
    let sql = `SELECT "Usuarios"."id_Tusuario", "Usuarios".id_usuario, "Usuarios".nombre, 
    "Usuarios".correo, "Usuarios".celular, "TiposUsuarios".nombre
        FROM public."Usuarios"
        INNER JOIN public."TiposUsuarios" ON public."Usuarios".id_tipo = "TiposUsuarios"."id_tipo";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};


//Inserta usuarios en la base de datos
const guardarUsuario = async (usuario) => {
    
    let sql = `INSERT INTO public."Usuarios"(
        id_usuario,  nombre, correo, celular, id_tipo)
        VALUES ($1, $2, $3, $4, $5 );`;
    let valores = [usuario.id_usuario, usuario.nombre, usuario.correo, 
        usuario.celular, usuario.id_tipo,];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


module.exports = {validarUsuario, consultarUsuario, guardarUsuario};