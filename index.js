//Importar express y cors
const express = require('express');
const cors = require('cors');

//Inicializar librería
const app = express();
app.use(express.json());
app.use(cors());

//Endpoint
app.get('/', (req,res) =>{
    res.send('Bienvenido al control de celo');
});
const vs = '/api/v1';

console.log(" User:"+process.env.USER+" host:"+
    process.env.HOST+" DB:"+
    process.env.DATABASE+" PD:"+
    process.env.PASSWORD+" host:"+
  process.env.PORT);

//Rutas importadas
const ruta_bovino = require('./routes/bovinos');
app.use(ruta_bovino);

const ruta_celo = require('./routes/celo');
app.use(ruta_celo);

 //Puerto
 const port = process.env.PORT || 3001;

 //Levantamiento
 app.listen(port, () => {
    console.log(`Escuchando API en PORT:${port}`);
 });