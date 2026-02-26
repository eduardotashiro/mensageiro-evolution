import http from "http"
import { ServerResponse } from "http"
const host = "localhost"
const port = 8000;

const requestListener = function (_req: any, res: any) {
    res.writeHead(200);
    res.end("meu primeiro servidor com node nativo, entendendo")
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`)
})