const ServicioPG = require('../services/postgres');

const validarBovino = bovino => {
    if (!bovino) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.chapeta){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.tipo_bovino){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }
};

//Trae todos los bovinos registrados
const consultarBovinos = async (bovino) => {
    let _servicio = new ServicioPG();
    let sql = `SELECT chapeta, tipo_bovino FROM public.bovino;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

//Trae un bovino en específico
let consultarBovino = async (tipo,chapeta) => {
    let _servicio = new ServicioPG();
    let sql = `SELECT chapeta FROM public.bovino
      WHERE tipo_bovino = $1 and chapeta = $2`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [tipo,chapeta]);
    return respuesta;
  };

  //Trae un bovino en específico
let consultarTipo = async (tipo) => {
  let _servicio = new ServicioPG();
  let sql = `SELECT chapeta FROM public.bovino
    WHERE tipo_bovino = $1 `;
    
  let respuesta = await _servicio.ejecutarSql(sql, [tipo]);
  return respuesta;
};

//Inserta Bovinos en la base de datos
const guardarBovino = async (bovino) => {
    //console.log(bovino);
    let _servicio = new ServicioPG();
    let sql = `INSERT INTO public.bovino(chapeta, tipo_bovino)
                values($1,$2);`;
    let valores = [bovino.chapeta, bovino.tipo_bovino];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

//Elimina un bovino de la base de datos
const eliminarBovino = async (chapeta) => {
    let _servicio = new ServicioPG();
    let sql = `DELETE FROM public.bovino where chapeta = $1`;    
    let respuesta = await _servicio.ejecutarSql(sql, [chapeta]);
    return respuesta
};

//Actualiza la información de un bovino
const editarBovino = async (bovino, chapeta) => {
    if (bovino.chapeta != chapeta) {
      throw {
        ok: false,
        mensaje: "El id del bovino no corresponde al enviado",
      };
    }
    let _servicio = new ServicioPG(); 
    let sql =
      `UPDATE public.bovino SET chapeta=$1, tipo_bovino=$2 WHERE chapeta=$3;`;
    let valores = [bovino.chapeta, bovino.tipo_bovino, chapeta];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };
  

module.exports = {validarBovino, consultarBovinos, consultarBovino,consultarTipo, guardarBovino, eliminarBovino, editarBovino};