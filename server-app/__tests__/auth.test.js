import request from 'supertest';
import { app } from '../src/app.js';  // Asegúrate de exportar app desde tu archivo principal
import { connectDB, disconnectDB } from '../src/config/database.js';
import User from '../src/models/userModel.js';

describe('Auth Endpoints', () => {
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

  describe('POST /api/auth/register', () => {
    it('should create a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123456',
          confirmPassword: 'Test123456'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user.email', 'test@example.com');
    });

    it('should fail if email is invalid', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Test123456',
          confirmPassword: 'Test123456'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toContain('email');
    });

    it('should fail if passwords do not match', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123456',
          confirmPassword: 'Test123457'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toContain('contraseñas no coinciden');
    });

    it('should fail if password is too weak', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '123456',
          confirmPassword: '123456'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toContain('contraseña');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123456',
          confirmPassword: 'Test123456'
        });
    });

    it('should login successfully', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test123456'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user.email', 'test@example.com');
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Credenciales inválidas');
    });

    it('should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Test123456'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Credenciales inválidas');
    });
  });
});