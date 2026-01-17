import jwt from 'jsonwebtoken';
import User from "../models/User.js";


export const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({error: 'Authorization header missing or malformed'});
        }

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return res.status(403).json({error: 'Invalid or expired token'});
        }

        const user = await User.findById(decoded.userId).select('-hashedPassword');
        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}