import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = '10s';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
export const signup = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).send({ error: "Username or password  or first name or lastName is required" });
        }

        const duplicateUser = await User.findOne({ username });

        if (duplicateUser) {
            return res.status(409).send({ error: "Username exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`
        });

        return res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ error: "Username or password is required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).send({ error: "Invalid username or password" });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_TTL }
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');

        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_TTL
        });

        return res.status(200).json({ message: 'Sign-in successful', accessToken });

    } catch (error) {
        console.log('Error during signIn:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const signOut = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.sendStatus(204);
        }

        await Session.deleteOne({ refreshToken });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.sendStatus(204);
    } catch (error) {
        console.log('Error during signOut:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token missing' });
        }

        const session = await Session.findOne({ refreshToken });

        if (!session) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        if (session.expiresAt < new Date()) {
            await Session.deleteOne({ refreshToken });
            return res.status(403).json({ error: 'Refresh token expired' });
        }

        const accessToken = jwt.sign(
            { userId: session.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_TTL }
        );

        return res.status(200).json({ accessToken });

    } catch (error) {
        console.log('Error during token refresh:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
