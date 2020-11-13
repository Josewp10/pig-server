const {pool, Pool} = require('pg');

class ServicioPG {
    constructor(){
        this.pool = new Pool({
            user: 'wwkqgpyabacigx',
            host: 'ec2-54-160-18-230.compute-1.amazonaws.com',
            database: 'd7j4cunfm66vch',
            password: 'eb8fec67367c88b4c676a2a2352a13cd46c6a9b4d8b4ed9f82e36ed9f8d4c5ec',
            port: 5432
        });
    }

    // Ejecuta la clase y el metodo se debe hacer
// de forma asincrona para que respuesta tenga un valor
  
async ejecutarSql(sql,params) {
    let respuesta = await this.pool.query(sql,params);
    return respuesta;
  }
}

// Exporta la clase, para poder ser utilizada desde otros archivos

module.exports = ServicioPG;