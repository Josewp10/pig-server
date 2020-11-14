const ServicePG = require("../services/postgres");
let _service = new ServicePG();

const ver_tratamiento = async (tratamiento) => {    
  let sql = `SELECT * FROM public."ControlTratamientos";`;
  let respuesta = await _service.ejecutarSql(sql);
  return respuesta
};
  
  let crear_tratamiento = async (tratamiento) => {
    let sql = `INSERT INTO public."ControlTratamientos"(
      id_tratamiento, fecha_inicio, fecha_fin, hora, enfermedad, detalles, tipo_dosis, id_bovino, id_usuario)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9)`;
        
        let values = [
          tratamiento.id_tratamiento,
          tratamiento.fecha_inicio,
          tratamiento.fecha_fin,
          tratamiento.hora,
          tratamiento.enfermedad,
          tratamiento.detalles,
          tratamiento.tipo_dosis,
          tratamiento.id_bovino,
          tratamiento.id_usuario];
      
          let respuesta = await _service.ejecutarSql(sql, values);
          return respuesta;
  };

   
  module.exports = {
    ver_tratamiento, 
    crear_tratamiento,
  };