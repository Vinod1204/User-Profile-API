// src/routes/userRoutes.ts
import express from 'express';
import { rateLimiter, authenticate, authorizeRole } from '../middlewares/auth';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = express.Router();


router.use(rateLimiter);
router.use(authenticate as express.RequestHandler);


router.get('/', authorizeRole(['admin']) as express.RequestHandler, getUsers);
router.get('/:id', authorizeRole(['admin', 'user']) as express.RequestHandler, getUserById);
router.post('/', authorizeRole(['admin']) as express.RequestHandler, createUser);
router.put('/:id', authorizeRole(['admin', 'user']) as express.RequestHandler, updateUser);
router.delete('/:id', authorizeRole(['admin']) as express.RequestHandler, deleteUser);

export default router;

