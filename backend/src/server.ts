import { config } from './config/config.js';
import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import templateRoutes from './routes/templates.route.js';
import userRoutes from './routes/users.route.js';
import emailRoutes from './routes/email.route.js';
import { AuthenticatedRequest, authMiddleware } from './middleware/authMiddleware.js';

export const app = express();

const corsOptions = {
  origin: config.CORS_ORIGIN,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(json());



app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);



//test autentication
app.get("/api/auth/me", authMiddleware, (req: AuthenticatedRequest, res) => {
    return res.status(200).json({ message: "User authenticated", user: req.user });
})




app.listen(config.port, () => {
    try {
        console.log(`Server is running on port ${config.port}`);
        console.log(` _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ 
|     |   __|   | |   __|  _  |   __|   __|     | __  |     |
| | | |   __| | | |__   |     |  |  |   __|-   -|    -|  |  |
|_|_|_|_____|_|___|_____|__|__|_____|_____|_____|__|__|_____|`)
    } catch (error) {
        console.error('Error starting server:', error);
    }
});
