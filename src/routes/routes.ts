import express from 'express';
import { handleError } from '../middleware/errorHandler';
import { handleRegisterStart, handleRegisterFinish } from '../controllers/registration';
import { handleLoginStart, handleLoginFinish } from '../controllers/authentication';
import { calculateCircle } from '../controllers/calculator'; 

const router = express.Router();

router.post('/registerStart', handleRegisterStart);
router.post('/registerFinish', handleRegisterFinish);
router.post('/loginStart', handleLoginStart);
router.post('/loginFinish', handleLoginFinish);

router.post('/calculate', calculateCircle);

router.use(handleError);

export { router };
