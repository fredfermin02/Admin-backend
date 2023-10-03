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
app.use('/api/hospital', require('./routes/hospitals'));
app.use('/api/medic', require('./routes/medic'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));





app.listen(process.env.PORT, ()=> {
    console.log("Servidor corriendo")
})