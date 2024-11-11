# Aquí te explico cómo implementar MongoDB

## Paso 1: Configurar el entorno

Instala los paquetes necesarios ejecutando:

~~~~js
npm install express mongoose dotenv
~~~~

## Paso 2: Configurar MongoDB Atlas

1. Ve a mongodb.com y crea una cuenta si aún no tienes una.
2. Crea un nuevo clúster en MongoDB Atlas.
3. Haz clic en "Connect" y selecciona la opción "Connect your application".
4. Copia la cadena de conexión que se muestra.

## Paso 3: Configurar la conexión a MongoDB

Crea un archivo llamado .env en la raíz del proyecto y agrega tu cadena de conexión:

~~~~js
MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<tu_base_de_datos>?retryWrites=true&w=majority
~~~~

Luego, crea un archivo llamado config.js con el siguiente contenido:

~~~~js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
~~~~

## Paso 4: Crear el modelo Mongoose

Crea una carpeta llamada models y dentro de ella un archivo llamado Producto.js:

~~~~js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
});

module.exports = mongoose.model('Producto', productoSchema);
~~~~

## Paso 5: Configurar Express y conectar MongoDB

Crea un archivo llamado app.js con el siguiente código:

~~~~js
const express = require('express');
const connectDB = require('./config');
const Producto = require('./models/producto');

const app = express();

connectDB();

app.use(express.json());

// Rutas para manejar productos
app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  try {
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ mensaje: 'No se pudo crear el producto' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
~~~~

*Este es solo un ejemplo básico. Puedes agregar más endpoints para obtener, actualizar o eliminar productos, según tus necesidades específicas.*
