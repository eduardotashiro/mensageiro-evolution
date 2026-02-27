import http, { IncomingMessage, METHODS, ServerResponse } from "http"
import { config } from './config/config.js';
import cors from 'cors';
import templateRoutes from './routes/templates.route.js';
import userRoutes from './routes/users.route.js';
import emailRoutes from './routes/email.route.js';
import { AuthenticatedRequest, authMiddleware } from './middleware/authMiddleware.js';

const host = config.host
const port = Number(config.port)
// // console.log("PORT:", config.port)
// // console.log("HOST:", config.host)
// const corsOptions = {
//     origin: config.CORS_ORIGIN,
//     optionsSuccessStatus: 200
// };

// const requestListenerTest = ((req: IncomingMessage, res:ServerResponse) => {
//     const {method,url} = req
//     // const parseUrl = new URL(req.url!,`http://${req.headers.host}`)

//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Origin", `${corsOptions}`);
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     if (method === "OPTIONS") {
//         res.writeHead(204);
//         res.end(userRoutes)
//         return
//     }

//     if (method === "GET" && url === "/api/auth") {
//         res.writeHead(200,{"content-type":"application/json"})
//         res.end()
//         return
//     }
 
// })

const server = http.createServer((req,res)=>{
    router(req,res)
    res.writeHead(200);
    res.end()
})

server.listen(port, host,() => {
    try {
        console.log(`Server is listening on http://${host}:${port}`)
    } catch (error) {
        process.exit(1)
    }
})


// import authRoutes from './routes/auth.route.js';
// // import express, { json } from 'express';
// import http from "http"


// export const app = express();



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
