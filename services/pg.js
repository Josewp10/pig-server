var pg = require('pg'); 


class ServicioPG {
    constructor(){
    var params = { 
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: true };

        var client = new pg.Client(params); 
        client.connect();
    }   
    
    async ejecutarSql(sql,params) {
        let respuesta = await this.client.query(sql,params);
        return respuesta;
      }
}
module.exports = ServicioPG;