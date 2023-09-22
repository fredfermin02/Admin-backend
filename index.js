require('dotenv').config();

const  express  = require("express");
var cors = require('cors');

const {dbConnection} = require('./database/config')


//Create express server
const app = express();

//Set up CORS
app.use(cors());

//Database
dbConnection();

//Routesz
app.get('/', (req, res) => {
    res.status(400).json({
        ok:true,
        msg:'Hola mundo'
    })
});

app.listen(process.env.port, ()=> {
    console.log("Servidor corriendo")
})