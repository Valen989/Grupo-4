const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')
const PORT = 3000;

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

const indexRoutes = require('./routes/index.routes')
const recordsRoutes = require('./routes/records.routes')
const radiosRoutes = require('./routes/radios.routes')
const usersRoutes = require('./routes/users.routes')


  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname,'..', "public")))


//configuración del motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//Extraer los  datos del formulario
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



//Configuracion para las sesion


  //Rutas
app.use("/", indexRoutes )
app.use("/records",  recordsRoutes)
app.use("/radios",  radiosRoutes)
app.use("/users", usersRoutes)


app.listen(PORT, (req, res) => {
    console.log(`server running in http://localhost:${PORT}`);
    
}) 