import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.route.js';

const app = express();

// CORS configuration
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Set morgan to 'dev' logging format
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// Define port
const PORT = process.env.PORT || 8080;

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

// User routes
app.use('/api/user', userRouter);

// Category routes
app.use('/api/category',categoryRouter)

app.use("/api/file",uploadRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
});

// Database connection and server startup
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
