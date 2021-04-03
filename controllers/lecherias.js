const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();

const validarLecheria = lecheria => {
    if (!lecheria) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la pajilla'
        };
    }else if(!lecheria.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la lecheria'
        };
    }else if(!lecheria.cantidad_dia){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de inicio'
        };
    }else if(!lecheria.id_usuario){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha fin'
        };
    }
};

const consultarLecherias = async () => {    
    let sql =  `SELECT "Lecheria_Lactante"."id_Tlecheria",lecheria, "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Lecheria_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Lecherias" on "Lecheria_Lactante"."id_Tlecheria" = "Lecherias"."id_Tlecheria"
	inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario;`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};
let consultarLecheria = async (id_) => {
    let sql = `SELECT "Lecheria_Lactante"."id_Tlecheria",lecheria, "Bovinos".nombre, fecha, cantidad_dia, "Usuarios".nombre
	FROM public."Lecheria_Lactante"
	inner join public."Bovinos" on id_lactante = chapeta
	inner join public."Lecherias" on "Lecheria_Lactante"."id_Tlecheria" = "Lecherias"."id_Tlecheria"
	inner join public."Usuarios" on "Lecherias".id_usuario="Usuarios".id_usuario
	where "Lecherias"."id_Tlecheria"=$1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [id_lecheria]);
    return respuesta;
  };

