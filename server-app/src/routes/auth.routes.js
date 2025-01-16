import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Ruta para registro de usuarios
authRouter.post('/register', [
    body('email').isEmail().withMessage('Por favor ingrese un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido')
], authController.register);

// Ruta para login de usuarios
authRouter.post('/login', [
    body('email').isEmail().withMessage('Por favor ingrese un email válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
], authController.login);

// Ruta para obtener el perfil del usuario
authRouter.get('/profile', auth, authController.getProfile);

// Ruta para cerrar sesión
authRouter.post('/logout', auth, authController.logout);

// Ruta para actualizar el perfil
authRouter.put('/profile', auth, [
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Por favor ingrese un email válido')
], authController.updateProfile);

// Ruta para cambiar contraseña
authRouter.put('/change-password', auth, [
    body('currentPassword').notEmpty().withMessage('La contraseña actual es requerida'),
    body('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
], authController.changePassword);

export default authRouter;