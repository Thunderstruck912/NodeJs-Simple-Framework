export const parseJson = (req: any, res: any) => {
	res.writeHead(201, { 'Content-type': 'application/json' });
	res.send = (data: unknown) => {
		res.end(JSON.stringify(data));
	};
};
