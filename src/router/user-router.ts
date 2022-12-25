import { userController } from '../controller/user-controller.js';
import { Router } from '../framework/Router.js';

export const router = new Router();

router.get('/users', userController.getUsers);

router.post('/users', userController.createUser);
