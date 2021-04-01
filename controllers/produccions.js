const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

const validarProduccion = produccion => {
    if (!produccion) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!produccion.id_lecheria){
        throw{
            ok: false,
            mensaje: 'Ingrese la lecheria'
        };
    }else if(!produccion.fecha_inicio){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }else if(!produccion.fecha_fin){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha fin'
        };
    }else if(!produccion.cantidad_semanal){
        throw{
            ok: false,
            mensaje: 'Ingrese la cantidad semanal '
        };
    }
};

const consultarProducciones = async () => {    
    let sql = `SELECT id_produccion, id_lecheria, fecha_inicio, fecha_fin, cantidad_semanal
	FROM public."ProduccionS";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

let consultarProduccion = async (id_lecheria) => {
    let sql = `SELECT id_produccion, id_lecheria, fecha_inicio, fecha_fin, cantidad_semanal
	FROM public."ProduccionS" WHERE id_lecheria= $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta;
  };

  const eliminarProduccion = async (id_lecheria) => {
    let sql = `DELETE FROM public."ProduccionS" where id_lecheria = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta
};



module.exports = {validarProduccion, consultarProduccion, 
    consultarProducciones, eliminarProduccion};