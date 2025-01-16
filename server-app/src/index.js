// Estructura de directorios y archivos principales

// src/index.js
import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';



const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port http://localhost:${PORT}');
});