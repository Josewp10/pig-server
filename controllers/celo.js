/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de controles de celo
 */


//Llamado a todas las librerías, servicios y controladores requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

/**
 * @description Se toma el parametro con la información del control de celo y se valida:
 *  - Que no sea vacío.
 *  - Que contenga los campos: id_macho, id_hembra, fecha_inicio, detalles, id_usuario.
 * @param {*} celo 
 */
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

/**
 * @description Consulta todos los celos registrados en la base de datos.
 * @returns 
 */
const consultarCelos = async () => {
    let sql = `Select id_celo, fecha_inicio, detalles,
                (Select nombre from public."Bovinos" where chapeta = id_macho) as "Nombre_Macho",
                (Select nombre from public."Bovinos" where chapeta = id_hembra) as "Nombre_Hembra", 
                public."Usuarios"."nombre", fecha_posible_parto
                from public."ControlCelos" 
                inner join public."Usuarios" on public."Usuarios"."id_usuario" = public."ControlCelos"."id_usuario"
                where id_celo>0
                ORDER BY id_celo ASC;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Conculta toda la información de un celo en específico de la base de datos.
 * @param {int} id_celo 
 * @returns 
 */
let consultarCelo = async (id_celo) => {
    let sql = `Select id_celo, fecha_inicio, detalles,
                id_macho,
                (Select nombre from public."Bovinos" where chapeta = id_macho) as "Nombre_Macho",
                id_hembra,
                (Select nombre from public."Bovinos" where chapeta = id_hembra) as "Nombre_Hembra",
                public."Usuarios"."id_usuario", public."Usuarios"."nombre", fecha_posible_parto
                from public."ControlCelos"
                inner join public."Usuarios" 
                on public."Usuarios"."id_usuario" = public."ControlCelos"."id_usuario"
                where id_celo=$1;`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_celo]);
    return respuesta;
  };

/**
 * @description Almacena un control de celo en la base de datos.
 * @param {Object} celo 
 * @returns 
 */
const guardarCelo = async (celo) => {
    //console.log(celo);
    let sql = `Insert into public."ControlCelos"(fecha_inicio, detalles, id_macho, id_hembra, id_usuario)
                values ($1,$2,$3,$4,$5);`;
    let valores = [celo.fecha_inicio, celo.detalles, celo.id_macho, celo.id_hembra, celo.id_usuario];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

/**
 * @description Elimina un control de celo de la base de datos.
 * @param {int} id_celo 
 * @returns 
 */
const eliminarCelo = async (id_celo) => {
    let sql = `DELETE FROM public."ControlCelos"
	            WHERE id_celo = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_celo]);
    return respuesta
};

/**
 * @description Actualiza la información de un control de celo en la base de datos. 
 * @param {Object} celo 
 * @param {int} id_celo 
 * @returns 
 */
const editarCelo = async (celo, id_celo) => {
    if (celo.id_celo != id_celo) {
      throw {
        ok: false,
        mensaje: "El id del celo no corresponde al enviado",
      };
    }
    let sql =`CALL public.updateprenez($1,$2,$3,$4,$5,$6);`;
      let valores = [celo.fecha_inicio, celo.detalles, celo.id_macho, celo.id_hembra, celo.id_usuario, celo.id_celo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };
  

module.exports = {validarCelo, consultarCelos, consultarCelo,guardarCelo, eliminarCelo, editarCelo};