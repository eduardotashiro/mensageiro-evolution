import http, { IncomingMessage, ServerResponse } from "http"

type HTTPHandler = (req: IncomingMessage, res: ServerResponse) => void;

export class HTTPServer {
    private port: number;
    private host: string;
    private handler: HTTPHandler;
    private server: http.Server;

    constructor(port: number, host: string, handler: HTTPHandler) {
        this.port = port;
        this.host = host;
        this.handler = handler
        this.server = http.createServer(this.handler)
    }

    async StartServer(): Promise<void> {
        await new Promise<void>(resolve => this.server.listen(this.port, this.host, resolve))
    }
    async CloseServer(): Promise<void> {
        await new Promise<Error | undefined>(resolve => this.server.close(resolve))
    }
}

