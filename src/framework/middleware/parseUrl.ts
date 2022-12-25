import { URL } from 'node:url';

export const parseUrl = (baseUrl: string) => (req: any, res: any) => {
	const url = new URL(req.url, baseUrl);
	const params: any = {};
	url.searchParams.forEach((value, key) => (params[key] = value));
	req.pathname = url.pathname;
	req.params = params;
};
