import { IncomingMessage, ServerResponse } from "http"
import { authRoutes } from "./routes/auth.route.js"

const routes = [...authRoutes];

export async function userAuthenticationRoute(req: IncomingMessage, res: ServerResponse) {
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        const pathMatch = route.path === req.url
        return pathMatch && methodMatch;
    })
    if (!route) {
        res.writeHead(404)
        res.end(JSON.stringify({ error: "Route not Found!!!" }))
        return;
    }
    if (route) {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString(); //converte buffer para string
        })
        req.on("end", () => {
           route.handler(req, res, body);
        })
    }
}


