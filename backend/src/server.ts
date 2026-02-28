import { HTTPServer } from './httpServer.js';
import { IncomingMessage, ServerResponse } from 'http';
import { config } from './config/config.js';
import { userAuthenticationRoute } from './auth.router.js';

const host = String(config.host)
const port = Number(config.port)
console.log("PORT:", config.port)
console.log("HOST:", config.host)


async function main() {
    try {
        const handler = (req: IncomingMessage, res: ServerResponse) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", config.CORS_ORIGIN!);
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            userAuthenticationRoute(req,res)
        }

        const server = new HTTPServer(port, host, handler)

        await server.StartServer()
        console.log(`Server is listening on http://${host}:${port}`)

    } catch (e) {
        console.log(e)
    }
}

await main();