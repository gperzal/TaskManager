import request from 'supertest';
import express from 'express';
import User from '../src/models/userModel.js';
import cors from 'cors';
import authRoutes from '../src/routes/authRoutes.js';
import { connectDB, disconnectDB } from '../src/config/db.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);


describe('Authentication Tests', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await User.deleteMany({});
        await disconnectDB();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    const validUser = {
        email: 'test@example.com',
        password: 'Test123456',
        confirmPassword: 'Test123456'
    };

    describe('POST /api/auth/register', () => {
        describe('Email Validation', () => {
            it('should fail if email is empty', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, email: null });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'email',
                    message: 'El email es requerido'
                });
            });

            it('should fail if email format is invalid', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, email: 'invalidemail' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'email',
                    message: 'El formato del email no es válido'
                });
            });

            it('should fail if email is too long', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, email: 'a'.repeat(60) + '@example.com' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'email',
                    message: 'El email es demasiado largo'
                });
            });
        });

        describe('Password Validation', () => {
            it('should fail if password is empty', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: null, confirmPassword: null });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña es requerida'
                });
            });

            it('should fail if password is too short', async () => {
                const shortPass = 'Test1';
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: shortPass, confirmPassword: shortPass });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña debe tener al menos 6 caracteres'
                });
            });

            it('should fail if password is too long', async () => {
                const longPass = 'Test1' + 'a'.repeat(30);
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: longPass, confirmPassword: longPass });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña no puede exceder los 32 caracteres'
                });
            });

            it('should fail if password has no uppercase', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: 'test123456', confirmPassword: 'test123456' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                });
            });

            it('should fail if password has no lowercase', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: 'TEST123456', confirmPassword: 'TEST123456' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                });
            });

            it('should fail if password has no numbers', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, password: 'TestTest', confirmPassword: 'TestTest' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                });
            });

            it('should fail if passwords do not match', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, confirmPassword: 'DifferentPass123' });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'confirmPassword',
                    message: 'Las contraseñas no coinciden'
                });
            });
        });

        describe('Success Cases', () => {
            it('should register successfully with valid data', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send(validUser);

                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('token');
                expect(res.body.user.email).toBe(validUser.email.toLowerCase());
                expect(res.body.message).toBe('Usuario registrado exitosamente');
            });

            it('should convert email to lowercase', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send({ ...validUser, email: 'TEST@EXAMPLE.COM' });

                expect(res.status).toBe(201);
                expect(res.body.user.email).toBe('test@example.com');
            });

            it('should fail if email already exists', async () => {
                await request(app).post('/api/auth/register').send(validUser);
                const res = await request(app)
                    .post('/api/auth/register')
                    .send(validUser);

                expect(res.status).toBe(400);
                expect(res.body.message).toBe('El usuario ya existe');
            });
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/auth/register')
                .send(validUser);
        });

        describe('Validation', () => {
            it('should fail if email is empty', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({ password: validUser.password });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'email',
                    message: 'El email es requerido'
                });
            });

            it('should fail if email format is invalid', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({ email: 'invalidemail', password: validUser.password });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'email',
                    message: 'El formato del email no es válido'
                });
            });

            it('should fail if password is empty', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({ email: validUser.email });

                expect(res.status).toBe(400);
                expect(res.body.errors[0]).toEqual({
                    field: 'password',
                    message: 'La contraseña es requerida'
                });
            });
        });

        describe('Authentication', () => {
            it('should login successfully with valid credentials', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({
                        email: validUser.email,
                        password: validUser.password
                    });

                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('token');
                expect(res.body.user.email).toBe(validUser.email.toLowerCase());
                expect(res.body.message).toBe('Login exitoso');
            });

            it('should fail with incorrect password', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({
                        email: validUser.email,
                        password: 'WrongPass123'
                    });

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Credenciales inválidas');
            });

            it('should fail with non-existent email', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({
                        email: 'nonexistent@example.com',
                        password: validUser.password
                    });

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Credenciales inválidas');
            });
        });
    });
});