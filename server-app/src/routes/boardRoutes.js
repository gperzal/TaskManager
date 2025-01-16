import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';


const boardRouter = express.Router();

// Aplicar middleware de autenticación a todas las rutas
boardRouter.use(auth);

// Crear un nuevo tablero
boardRouter.post('/', [
    body('title').notEmpty().withMessage('El título del tablero es requerido'),
    body('description').optional()
], boardController.createBoard);

// Obtener todos los tableros del usuario
boardRouter.get('/', boardController.getBoards);

// Obtener un tablero específico
boardRouter.get('/:id', boardController.getBoardById);

// Actualizar un tablero
boardRouter.put('/:id', [
    body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
    body('description').optional()
], boardController.updateBoard);

// Eliminar un tablero
boardRouter.delete('/:id', boardController.deleteBoard);

// Añadir miembro al tablero
boardRouter.post('/:id/members', [
    body('userId').notEmpty().withMessage('El ID del usuario es requerido')
], boardController.addBoardMember);

// Eliminar miembro del tablero
boardRouter.delete('/:id/members/:userId', boardController.removeBoardMember);

// Obtener miembros del tablero
boardRouter.get('/:id/members', boardController.getBoardMembers);

// Rutas para columnas dentro de un tablero
boardRouter.post('/:id/columns', [
    body('title').notEmpty().withMessage('El título de la columna es requerido'),
    body('order').isNumeric().withMessage('El orden debe ser un número')
], boardController.createColumn);

boardRouter.put('/:id/columns/:columnId', [
    body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
    body('order').optional().isNumeric().withMessage('El orden debe ser un número')
], boardController.updateColumn);

boardRouter.delete('/:id/columns/:columnId', boardController.deleteColumn);

export default boardRouter;