import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();

// Load environment variables
dotenv.config();

// Retrieve allowed origins from environment variables
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is one of the allowed origins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true // Allow credentials (cookies, authorization headers)
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Import your routes
import imageRouter from './routes/image.route.js';
app.use('/api/v1/users', imageRouter);

export default app;
