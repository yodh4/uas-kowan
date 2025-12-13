import express from 'express';
import { handleError } from '../middleware/errorHandler';
import { handleRegisterStart, handleRegisterFinish } from '../controllers/registration';
import { handleLoginStart, handleLoginFinish } from '../controllers/authentication';
import { calculateCircle } from '../controllers/calculator'; // <--- JANGAN LUPA INI!

const router = express.Router();

router.post('/registerStart', handleRegisterStart);
router.post('/registerFinish', handleRegisterFinish);
router.post('/loginStart', handleLoginStart);
router.post('/loginFinish', handleLoginFinish);

router.post('/calculate', calculateCircle); // <--- Baris ini butuh import di atas

router.use(handleError);

export { router };