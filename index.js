require('dotenv').config();

const  express  = require("express");
var cors = require('cors');

const {dbConnection} = require('./database/config')


//Create express server
const app = express();

//Set up CORS
app.use(cors());

//Read body of request - parsing
app.use(express.json())

//Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));





app.listen(process.env.PORT, ()=> {
    console.log("Servidor corriendo")
})