const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();
const validarCelo = celo => {
    if (!celo) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del celo'
        };
    }else if(!celo.id_macho){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del macho'
        };
    }else if(!celo.id_hembra){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la hembra'
        };
    }else if(!celo.fecha_inicio){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }else if(!celo.detalles){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }else if(!celo.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }
};

//Trae todos los celos registrados
const consultarCelos = async (celo) => {
    let sql = `Select id_celo, fecha_inicio, detalles,
            (Select nombre from public."Bovinos" where id_bovino = id_macho) as "Nombre_Macho",
            (Select nombre from public."Bovinos" where id_bovino = id_hembra) as "Nombre_Hembra", 
            public."Usuarios"."nombre" 
            from public."ControlCelos"
            inner join public."Usuarios" 
            on public."Usuarios"."id_Tusuario" = public."ControlCelos"."id_usuario";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

//Trae un celo en específico
let consultarCelo = async (id_celo) => {
    let sql = `
    Select id_celo, fecha_inicio, detalles,
            (Select nombre from public."Bovinos" where id_bovino = id_macho) as "NombreM",
            (Select nombre from public."Bovinos" where id_bovino = id_hembra) as "NombreH", 
            public."Usuarios"."nombre" 
            from public."ControlCelos"
            inner join public."Usuarios" 
            on public."Usuarios"."id_Tusuario" = public."ControlCelos"."id_usuario"
            where id_celo = $1;`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_celo]);
    return respuesta;
  };

//Inserta celos en la base de datos
const guardarCelo = async (celo) => {
    //console.log(celo);
    let sql = `INSERT INTO public."ControlCelos"(fecha_inicio, detalles, id_macho, id_hembra, id_usuario)
                select ($1), ($2), ($3), ($4), 
                (SELECT public."Usuarios"."id_usuario" from public."Usuarios" where id_usuario = $5);`;
    let valores = [celo.fecha_inicio, celo.detalles, celo.id_macho, celo.id_hembra, celo.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

//Elimina un celo de la base de datos
const eliminarCelo = async (id_celo) => {
    let sql = `DELETE FROM public."ControlCelos"
	            WHERE id_celo = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_celo]);
    return respuesta
};

//Actualiza la información de un celo
const editarCelo = async (celo, id_celo) => {
    if (celo.id_celo != id_celo) {
      throw {
        ok: false,
        mensaje: "El id del celo no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."ControlCelos"
            SET fecha_inicio = $1, detalles = $2, id_macho = $3, id_hembra= $4, id_usuario= $5
            WHERE id_celo = $6;`;
      let valores = [celo.fecha_inicio, celo.detalles, celo.id_macho, celo.id_hembra, celo.id_usuario, celo.id_celo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };
  

module.exports = {validarCelo, consultarCelos, consultarCelo,guardarCelo, eliminarCelo, editarCelo};