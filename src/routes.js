import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CompanyUserController from './app/controllers/companyUserController';
import authMiddleware from './app/middlewares/auth';
import corsMiddleware from './app/middlewares/cors';
// import cors from 'cors';

const routes = new Router();

routes.use(corsMiddleware);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/validate-token', SessionController.validateToken);

// Todas as rotas após essa linha terá validações
routes.use(authMiddleware);

routes.post('/companies', CompanyUserController.store);
routes.get('/companies', CompanyUserController.companies);
routes.get('/company/:cnpj', CompanyUserController.getCompanyByCNPJ);
routes.delete('/company/:cnpj', CompanyUserController.delete);
routes.put('/companies', CompanyUserController.update);

export default routes;
