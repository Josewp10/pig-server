const ServicePG = require("../services/postgres");

let ver_tratamiento = async () => {
    let _service = new ServicePG();
    let sql = `SELECT *
      FROM "controlTratamiento".tratamientos`;
    let respuesta = await _service.runsql(sql);
    return respuesta;
  };

  let crear_tratamiento = async (tratamiento) => {
    let _service = new ServicePG();
    let sql = `INSERT INTO "controlTratamiento".tratamientos(
        id, enfermedades, porque, "fechaInicio","fechaFinal", hora, tipo_dosis, id_bovino)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    let values = [
        tratamiento.id,
        tratamiento.enfermedades,
        tratamiento.porque,
        tratamiento.fechaInicio,
        tratamiento.fechaFinal,
        tratamiento.hora,
        tratamiento.tipo_dosis,
        tratamiento.id_bovino
    ];
    let respuesta = await _service.runsql(sql, values);
    return respuesta;
  };
  module.exports = {
    ver_tratamiento, 
    crear_tratamiento,
  };