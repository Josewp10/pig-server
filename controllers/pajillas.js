const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

const validarPajilla = pajilla => {
    if (!pajilla) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!pajilla.id_termo){
        throw{
            ok: false,
            mensaje: 'Ingrese el id del termo'
        };
    }else if(!pajilla.id_toro){
        throw{
            ok: false,
            mensaje: 'Ingrese el toro'
        };
    }else if(!pajilla.id_raza){
        throw{
            ok: false,
            mensaje: 'Ingrese la raza del toro'
        };
    }else if(!pajilla.disponibilidad){
        throw{
            ok: false,
            mensaje: 'Ingrese la disponibilidad de la pajilla '
        };
    }
};

const consultarPajillas = async () => {    
    let sql = `SELECT id_pajilla, id_termo,"Pajillas".id_toro, "Bovinos".nombre as toro, "Razas".nombre as raza, disponibilidad
            FROM public."Pajillas"
            INNER JOIN public."Bovinos" ON "Pajillas".id_toro = "Bovinos"."chapeta"
            INNER JOIN public."Razas" ON "Pajillas".id_raza = "Razas"."id_raza"
            where id_pajilla>0 order by id_pajilla asc;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

let consultarPajilla = async (id_toro) => {
    let sql = `SELECT id_pajilla, id_termo,"Pajillas".id_toro, "Bovinos".nombre as toro, "Razas".nombre as raza, disponibilidad
	FROM public."Pajillas"
	INNER JOIN public."Bovinos" ON "Pajillas".id_toro = "Bovinos"."chapeta"
	INNER JOIN public."Razas" ON "Pajillas".id_raza = "Razas"."id_raza" WHERE "Pajillas".id_toro = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_toro]);
    return respuesta;
  };


  const guardarPajilla = async (pajilla) => {
    let sql = `INSERT INTO public."Pajillas"(id_termo, id_toro, id_raza, disponibilidad)
                VALUES ($1, $2, $3, $4);`;
    let valores = [
                   pajilla.id_termo,
                   pajilla.id_toro,
                   pajilla.id_raza,  
                   pajilla.disponibilidad];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

const eliminarPajilla = async (id_toro) => {
    let sql = `DELETE FROM public."Pajillas" where id_toro = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_toro]);
    return respuesta
};

const editarPajilla = async (pajilla, id_toro) => {
    if (pajilla.id_toro != id_toro) {
      throw {
        ok: false,
        mensaje: "El id del toro no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."Pajillas"
      SET  id_termo=$1,  id_raza=$2, disponibilidad=$3 WHERE id_toro = $4;`;
    let valores = [pajilla.id_termo,
                   pajilla.id_raza,  
                   pajilla.disponibilidad,
                   id_toro];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

  module.exports = {validarPajilla, consultarPajillas, 
    consultarPajilla,guardarPajilla, eliminarPajilla, 
    editarPajilla};