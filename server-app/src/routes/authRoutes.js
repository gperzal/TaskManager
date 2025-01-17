import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/auth/register', validateSchema(registerSchema), register);
router.post('/auth/login', validateSchema(loginSchema), login);

export default router;