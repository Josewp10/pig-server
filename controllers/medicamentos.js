/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de medicamentos
 */

//Llamado a todas las librerías y servicios requeridos
const ServicioPG = require('../services/postgres');
let _servicio = new ServicioPG();



 /**
  * @description Se toma el parametro con la información del medicamento y se valida:
  *  - Que no sea vacio.
  *  - Que contenga la chapeta, tipo medicamento.
  * @param {Object} medicamento 
  */
const validarMedicamento = medicamento => {
    if (!medicamento) {
        throw{
            ok: false,
            mensaje: 'Ingrese la información del medicamento'
        };
    }else if(!medicamento.codigo){
        throw{
            ok: false,
            mensaje: 'Ingrese el codigo del medicamento'
        };
    }else if(!medicamento.nombre){
        throw{
            ok: false,
            mensaje: 'Ingrese el nombre del medicamento'
        };
    }else if(medicamento.horas_retiro_leche===null){
        throw{
            ok: false,
            mensaje: 'Ingrese las horas de retiro que requiere el medicamento'
        };
    }else if(!medicamento.fecha_compra){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de compra medicamento'
        };
    }else if(!medicamento.fecha_vencimiento){
        throw{
            ok: false,
            mensaje: 'Ingrese la fecha de vencimiento medicamento'
        };
    }else if(!medicamento.disponibilidad){
        throw{
            ok: false,
            mensaje: 'Ingrese la disponibilidad del medicamento'
        };
    }
};

/**
 * @description Consulta toda la información de los medicamentos en la base de datos.
 * @returns
 */
const consultarMedicamentos = async () => {    
    let sql = `SELECT "id_Tmedicamento", codigo, nombre, descripcion, 
                horas_retiro_leche, fecha_compra, fecha_vencimiento, disponibilidad
	            FROM public."Medicamentos";`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta
};

/**
 * @description Conslulta un medicamento en específico en la base de datos.
 * @param {String} codigo
 * @returns
 */
let consultarMedicamento = async (codigo) => {   
    let sql = `SELECT "id_Tmedicamento", codigo, nombre, 
                descripcion, horas_retiro_leche, 
                fecha_compra, fecha_vencimiento, disponibilidad
                FROM public."Medicamentos" where codigo = $1;`;
      
    let respuesta = await _servicio.ejecutarSql(sql, [codigo]);
    return respuesta;
  };


/**
 * @description Almacena un nuevo medicamento en la base de datos.
 * @param {Object} medicamento
 * @returns 
 */
const guardarMedicamento = async (medicamento) => {
    let sql = `INSERT INTO public."Medicamentos"(codigo, 
            nombre, descripcion, horas_retiro_leche, fecha_compra, fecha_vencimiento, disponibilidad)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    let valores = [medicamento.codigo, medicamento.nombre, medicamento.descripcion, 
                    medicamento.horas_retiro_leche, medicamento.fecha_compra, 
                    medicamento.fecha_vencimiento,medicamento.disponibilidad];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta
};


/**
 * @description Elimina un medicamento de la base de datos.
 * @param {String} chapeta 
 * @returns
 */
const eliminarMedicamento = async (chapeta) => {
    let sql = `DELETE FROM public."Medicamentos"
	            WHERE codigo = $1;`;    
    let respuesta = await _servicio.ejecutarSql(sql, [chapeta]);
    return respuesta
};

/**
 * @description Modifica la información de un medicamento.
 * @param {Object} medicamento 
 * @param {String} chapeta
 * @returns 
 */
const editarMedicamento = async (medicamento, codigo) => {
    if (medicamento.codigo != codigo) {
      throw {
        ok: false,
        mensaje: "El codigo del medicamento no corresponde al enviado",
      };
    }
    let sql =`UPDATE public."Medicamentos"
            SET codigo= $1, nombre= $2, descripcion= $3, horas_retiro_leche= $4, 
            fecha_compra= $5, fecha_vencimiento= $6, disponibilidad= $7
            WHERE codigo = $8;`;
    let valores = [medicamento.codigo, medicamento.nombre, medicamento.descripcion, 
        medicamento.horas_retiro_leche, medicamento.fecha_compra, 
        medicamento.fecha_vencimiento,medicamento.disponibilidad, codigo];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };
  

module.exports = {validarMedicamento, consultarMedicamentos, 
                 consultarMedicamento, guardarMedicamento, 
                 eliminarMedicamento, editarMedicamento};