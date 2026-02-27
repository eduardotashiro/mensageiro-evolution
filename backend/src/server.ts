import { HTTPServer } from './httpServer.js';
import { IncomingMessage, ServerResponse } from 'http';
import { config } from './config/config.js';


const host = String(config.host)
const port = Number(config.port)
console.log("PORT:", config.port)
console.log("HOST:", config.host)

const handler = (_req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", config.CORS_ORIGIN!);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // router(req,rep) WIP
}

const server = new HTTPServer(port, host, handler)

server.StartServer().then(() => [
    console.log(`Server is listening on http://${host}:${port}`)
])
