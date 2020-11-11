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
    }else if(!celo.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }
};

//Trae todos los celos registrados
const consultarCelos = async (celo) => {
    let sql = `SELECT id_celo, id_macho, id_hembra, fecha FROM public.celo;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

//Trae un celo en específico
let consultarCelo = async (id_celo) => {
    let sql = `SELECT id_celo, id_macho, id_hembra, fecha FROM public.celo
      WHERE id_celo = $1`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [id_celo]);
    return respuesta;
  };

//Inserta celos en la base de datos
const guardarCelo = async (celo) => {
    //console.log(celo);
    let sql = `INSERT INTO public.celo(id_macho, id_hembra, fecha)
                values($1,$2,$3);`;
    let valores = [celo.id_macho, celo.id_hembra, celo.fecha];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

//Elimina un celo de la base de datos
const eliminarCelo = async (id_celo) => {
    let sql = `DELETE FROM public.celo where id_celo = $1`;    
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
      `UPDATE public.celo SET id_macho=$1, id_hembra=$2, fecha=$3 WHERE id_celo=$4;`;
    let valores = [celo.id_macho, celo.id_hembra, celo.fecha, id_celo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };
  

module.exports = {validarCelo, consultarCelos, consultarCelo,guardarCelo, eliminarCelo, editarCelo};