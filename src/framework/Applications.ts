import http from 'node:http';
import { EventEmitter } from 'node:events';

export class Application {
	public emitter;
	public server;
	public middlewares: ((req: any, res: any) => void)[];
	constructor() {
		this.emitter = new EventEmitter();
		this.server = this.createServer();
		this.middlewares = [];
	}
	public addRouter(router: any) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];
			Object.keys(endpoint).forEach((method) => {
				this.emitter.on(this.getRouteMask(path, method), (req, res) => {
					const handler = endpoint[method];
					handler(req, res);
				});
			});
		});
	}

	public useMiddleware(middleware: (req: any, res: any) => void) {
		this.middlewares.push(middleware);
	}

	public listen(port: number, callback: () => void) {
		this.server.listen(port, callback);
	}

	private createServer() {
		return http.createServer({}, (req: any, res: any) => {
			let body = '';
			req.on('data', (chunk: any) => {
				body += chunk;
			});

			req.on('end', () => {
				if (body) {
					req.body = JSON.parse(body);
				}
				this.middlewares.forEach((middleware) => middleware(req, res));
				const emmited = this.emitter.emit(this.getRouteMask(req.pathname, req.method), req, res);
				if (!emmited) {
					res.end();
				}
			});
		});
	}

	private getRouteMask(path: string, method: string) {
		return `[${path}]:[${method}]`;
	}
}
