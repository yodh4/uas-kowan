import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../middleware/customError';

export const calculateCircle = (req: Request, res: Response, next: NextFunction) => {
    // Cek apakah user sudah login lewat session
    if (!req.session.loggedInUserId) {
        return next(new CustomError('Unauthorized - Silakan Login Dulu', 401));
    }

    const { radius } = req.body;
    
    // Validasi input
    if (!radius || isNaNTc(Number(radius))) {
        return next(new CustomError('Jari-jari (radius) harus berupa angka', 400));
    }

    const r = Number(radius);
    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;

    // Kirim hasil JSON
    res.json({
        radius: r,
        area: area.toFixed(2),
        circumference: circumference.toFixed(2)
    });
};

// Helper untuk cek NaN
function isNaNTc(value: number): boolean {
    return Number.isNaN(value);
}