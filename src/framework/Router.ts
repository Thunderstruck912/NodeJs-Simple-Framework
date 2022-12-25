import { Endpoints } from './types';

export class Router {
	private endpoints: Endpoints;

	constructor() {
		this.endpoints = {};
	}

	request(method = 'GET', path: string, handler: (req: any, res: any) => void) {
		if (!this.endpoints[path]) {
			this.endpoints[path] = {};
		}

		const endpoint = this.endpoints[path];
		if (endpoint[method]) {
			throw new Error(`[${method} по адресу ${path} уже существует]`);
		}

		endpoint[method] = handler; 
	}

	get(path: string, handler: (req: any, res: any) => void) {
		this.request('GET', path, handler);
	}

	post(path: string, handler: (req: any, res: any) => void) {
		this.request('POST', path, handler);
	}

	put(path: string, handler: (req: any, res: any) => void) {
		this.request('PUT', path, handler);
	}
	delete(path: string, handler: (req: any, res: any) => void) {
		this.request('DELETE', path, handler);
	}
}
