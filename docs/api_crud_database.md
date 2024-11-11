# Aquí te explico cómo implementar un CRUD completo en Express utilizando MongoDB

## Instala los paquetes necesarios

~~~bash
npm install express mongoose dotenv
~~~

## Paso 2: Configurar MongoDB Atlas

1. Crea una cuenta en MongoDB Atlas si aún no tienes una.
2. Crea un nuevo clúster y obtén la cadena de conexión.
3. Crea un archivo .env en la raíz del proyecto con la cadena de conexión:

~~~js
MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<tu_base_de_datos>?retryWrites=true&w=majority
~~~

## Paso 3: Configurar la conexión a MongoDB

Crea un archivo config.js:

~~~js
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
~~~

## Paso 4: Definir el Schema

Crea un archivo schema.js:

~~~js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String
});

module.exports = mongoose.model('Product', productSchema);
~~~

## Paso 5: Crear el servidor Express

Crea un archivo server.js:

~~~js
const express = require('express');
const connectDB = require('./config');
const Product = require('./schema');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Rutas para gestionar productos
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'No se pudo crear el producto' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

~~~

## Resumen

Este código configura una aplicación Express que realiza operaciones CRUD sobre productos almacenados en MongoDB:

1. Crear: POST /api/products
2. Leer: GET /api/products y GET /api/products/:id
3. Actualizar: PUT /api/products/:id
4. Eliminar: DELETE /api/products/:id

El servidor utiliza Mongoose para interactuar con MongoDB y maneja errores en todas las rutas. También incluye un middleware personalizado para manejar errores generales.

Para ejecutar el servidor:

~~~bash
node server.js
~~~

*Este es un ejemplo básico. En un proyecto real, añadirías más validación, manejo de errores más detallado, autenticación y autorización, entre otros aspectos.*
