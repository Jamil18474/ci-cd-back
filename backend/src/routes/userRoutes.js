const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requirePermission } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management (authenticated users)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (authenticated users)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, requirePermission('read'), userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (authenticated users)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User MongoDB ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 64d3b6e3a7e4d6f42c93c1c1
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/:id', authenticateToken, requirePermission('read'), userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User MongoDB ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 64d3b6e3a7e4d6f42c93c1c1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticateToken, requirePermission('delete'), userController.deleteUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64d3b6e3a7e4d6f42c93c1c1
 *         firstName:
 *           type: string
 *           example: Patrick
 *         lastName:
 *           type: string
 *           example: Dupont
 *         email:
 *           type: string
 *           example: patrick.dupont@company.local
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 *         city:
 *           type: string
 *           example: Lyon
 *         postalCode:
 *           type: string
 *           example: 69001
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: [read]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;