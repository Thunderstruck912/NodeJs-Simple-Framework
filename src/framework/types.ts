export interface Endpoints {
	[path: string]: {
		[method: string]: (req: any, res: any) => void;
	};
}
