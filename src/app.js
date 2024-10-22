const express =  require('express');
const app = express();
const PORT = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, "public")));

//motor de plantillas
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

//ROUTES vinculadas
const recordsRoutes = require('./routes/records.routes');
const indexRoutes = require('./routes/index.routes');

app.use(indexRoutes);
app.use(recordsRoutes);

app.use((req, res) => {
    res.status(404).send('Página no encontrada'); })

app.listen(PORT, () => console.log('Server running in http://localhost:' + PORT))
