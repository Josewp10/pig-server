const ServicePG = require("../services/postgres");

let ver_tratamiento = async () => {
    let _service = new ServicePG();
    let sql = `SELECT *
      FROM "PIG".tratamientos`;
    let respuesta = await _service.runsql(sql);
    return respuesta;
  };

  let crear_tratamiento = async (tratamiento) => {
    let _service = new ServicePG();
    let sql = `INSERT INTO public."ControlTratamientos"(
      id_tratamiento, fecha_inicio, fecha_fin, hora, enfermedad, detalles, tipo_dosis, id_bovino, id_usuario)
      VALUES ('${tratamiento.id_tratamiento}',
      '${tratamiento.fecha_inicio}',
      '${tratamiento.fecha_fin}',
      '${tratamiento.hora}',
      '${tratamiento.enfermedad}',
      '${tratamiento.detalles}',
      '${tratamiento.tipo_dosis}',
      '${tratamiento.id_bovino}',
      '${tratamiento.id_usuario}');`;
      let respuesta = await _service.runsql(sql, values);
      return respuesta;
  };

   
  module.exports = {
    ver_tratamiento, 
    crear_tratamiento,
  };