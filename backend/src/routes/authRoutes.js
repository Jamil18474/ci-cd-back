const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication & Registration
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - birthDate
 *               - city
 *               - postalCode
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Patrick
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               email:
 *                 type: string
 *                 example: patrick.dupont@company.local
 *               password:
 *                 type: string
 *                 example: password123
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               city:
 *                 type: string
 *                 example: Lyon
 *               postalCode:
 *                 type: string
 *                 example: 69001
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: patrick.dupont@company.local
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful, returns JWT and user info
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user (requires JWT)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;