import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import authMiddleware from './app/middlewares/auth';
import authAdminMiddleware from './app/middlewares/authAdmin';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/students/:id', StudentController.show);
routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/help_orders', HelpOrderController.index);
routes.post('/students/:student_id/help_orders', HelpOrderController.store);

routes.use(authAdminMiddleware);

routes.post('/users', UserController.store);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.delete('/students/:id', StudentController.destroy);
routes.put('/students/:student_id', StudentController.update);

routes.get('/help_orders', GymHelpOrderController.index);
routes.get('/help_orders/:id', GymHelpOrderController.show);
routes.post('/help_orders/:id/answer', GymHelpOrderController.store);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.destroy);

export default routes;
