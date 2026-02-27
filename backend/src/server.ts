import http, { IncomingMessage, ServerResponse } from "http"
import { config } from './config/config.js';
// import cors from 'cors';

const host = config.host
const port = Number(config.port)
console.log("PORT:", config.port)
console.log("HOST:", config.host)

const requestListenerTest = function (_req: IncomingMessage, res:ServerResponse) {
    const data = {
        message: "this is a JSON response",
        timeStamp: Date.now(),
        note: 'he said "hello"' // Quotes automatically escaped
    }
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(200);
    res.end(JSON.stringify(data))
}

const server = http.createServer(requestListenerTest)

server.listen(port, host,() => {
    console.log(`Server is listening on http://${host}:${port}`)
})


// import authRoutes from './routes/auth.route.js';
// // import express, { json } from 'express';
// import http from "http"
// import templateRoutes from './routes/templates.route.js';
// import userRoutes from './routes/users.route.js';
// import emailRoutes from './routes/email.route.js';
// import { AuthenticatedRequest, authMiddleware } from './middleware/authMiddleware.js';


// export const app = express();

// const corsOptions = {
//     origin: config.CORS_ORIGIN,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(json());



// app.use("/api/auth", authRoutes);
// app.use("/api/templates", templateRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/email", emailRoutes);



// //test autentication
// app.get("/api/auth/me", authMiddleware, (req: AuthenticatedRequest, res) => {
//     return res.status(200).json({ message: "User authenticated", user: req.user });
// })


// const server = http.createServer(async (_req, _res) => {
   
// });

// server.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });

// app.listen(config.port, () => {
//     try {
//         console.log(`Server is running on port ${config.port}`);
//         console.log(` _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ 
// |     |   __|   | |   __|  _  |   __|   __|     | __  |     |
// | | | |   __| | | |__   |     |  |  |   __|-   -|    -|  |  |
// |_|_|_|_____|_|___|_____|__|__|_____|_____|_____|__|__|_____|`)
//     } catch (error) {
//         console.error('Error starting server:', error);
//     }
// });
