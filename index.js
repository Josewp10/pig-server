//Importar express y cors
const express = require('express');
const cors = require('cors');

//Inicializar librería
const app = express();


app.use(express.json());
app.use(cors());


//Endpoint
app.get('/', (req,res) =>{
    res.send('Bienvenido a PIG Plataforma de gestión ganadera');
});

const vs = '/api/v1';

//Rutas importadas

const bovinos = require("./routes/bovinos");
app.use(bovinos);

const ruta_controlRetiros = require("./routes/controlRetiros");
app.use(ruta_controlRetiros);

const ruta_controlTratamientos = require("./routes/controlTratamientos");
app.use(ruta_controlTratamientos);

 //Puerto
 const port = 3001;

 //Levantamiento
 app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
 });