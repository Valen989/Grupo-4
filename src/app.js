require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');

const { getAll } = require('./services/radio.service.js');

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/connectDB.js");

//Configuracion para las sesion
app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
  }));

app.use((req, res, next) => {
    res.locals.userLogin = req.session.userLogin || null;
    next();
});

app.use(methodOverride('_method'));

//registro de peticiones
app.use(morgan('short'));

//conexión con mongodb
connectDB();

//configuración del motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//manejo de los datos capturados en un formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//manejo de lso recursos estáticos
app.use(express.static(path.join(__dirname,'..', "public")));

app.use(getAll)


//Rutas
const indexRoutes = require('./routes/index.routes')
const recordsRoutes = require('./routes/records.routes')
const radiosRoutes = require('./routes/radios.routes')
const usersRoutes = require('./routes/users.routes')
const streamsRoutes = require('./routes/streams.routes');

app.use("/", indexRoutes )
app.use("/records",  recordsRoutes)
app.use("/radios", radiosRoutes)
app.use("/users", usersRoutes)
app.use("/streams", streamsRoutes)



app.listen(PORT, (req, res) => {
    console.log(`server running in http://localhost:${PORT}`);
    
}) 