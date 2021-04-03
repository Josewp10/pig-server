const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

const validarTermos = termo => {
    if (!termo) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!termo.num_pajillas){
        throw{
            ok: false,
            mensaje: 'Ingrese el id del termo'
        };
    }
};

const consultarTermos = async () => {    
    let sql = `SELECT id_termo, num_pajillas
	FROM public."Termos";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

let consultarTermo = async (id_termo) => {
    let sql = `SELECT id_termo, num_pajillas
	FROM public."Termos" WHERE id_termo = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_termo]);
    return respuesta;
  };

  const guardarTermo = async (termo) => {
    let sql = `INSERT INTO public."Termos"(
       num_pajillas) VALUES ($1);`;
    let valores = [
       termo.num_pajillas,
                  ];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};

const eliminarTermo = async (id_termo) => {
    let sql = `DELETE FROM public."Termos" where id_termo = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_termo]);
    return respuesta
};

const editarTermo = async (termo, id_termo) => {
    if (termo.id_termo != id_termo) {
      throw {
        ok: false,
        mensaje: "El id del termo no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."Termos"
      SET  num_pajillas=$1 WHERE id_termo= $2;`;
    let valores = [termo.num_pajillas,         
                   id_termo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

  module.exports = {validarTermos, consultarTermos, 
    consultarTermo,guardarTermo, eliminarTermo, 
    editarTermo};