const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

const indexRoutes = require('./routes/index.routes')
const recordsRoutes = require('./routes/records.routes')
const adminRoutes = require('./routes/admin.routes')

app.use(express.static(path.join(__dirname,'..', "public")))


//configuración del motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use("/", indexRoutes )
app.use("/records",  recordsRoutes)
app.use("/admin",  adminRoutes)


app.listen(port, (req, res) => {
    console.log(`server running in http://localhost:${port}`);
    
}) 