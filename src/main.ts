import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Application } from './framework/Applications.js';
import { parseJson } from './framework/middleware/parseJson.js';
import { parseUrl } from './framework/middleware/parseUrl.js';
import { router as userRouter } from './router/user-router.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

const app = new Application();

mongoose.set('strictQuery', true);

app.useMiddleware(parseJson);
app.useMiddleware(parseUrl(API_URL));
app.addRouter(userRouter);

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL || '');
		app.listen(Number(PORT), () => {
			console.log(`Server started on PORT: ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
