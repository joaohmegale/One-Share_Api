import { Router } from 'express'
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users/register', UserController.store);

routes.post('/users/login', UserController.login);

routes.use(authMiddleware);

// routes.put('/users/update', UserController.update)

routes.post('/comments', CommentController.createComment)

routes.delete('/comments/:commentId', CommentController.deleteComment)

routes.get('/comments/:postId', CommentController.commentByPost);

routes.get('/posts', PostController.listPosts);

routes.post('/posts', PostController.store);

routes.get('/posts/byId/:id', PostController.postById);

routes.delete('/posts/byId/:id', PostController.postDelete);

routes.put('/posts/byId/:id', PostController.postUpdate);

export default routes;