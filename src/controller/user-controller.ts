import { User } from '../models/user-model.js';

const getUsers = async (req: any, res: any) => {
	let users;
	if (req.params.id) {
		users = await User.findById(req.params.id);
	} else {
		users = await User.find();
	}
	res.send(users);
};

const createUser = async (req: any, res: any) => {
	const user = await User.create(req.body);
	res.send(user);
};

export const userController = {
	getUsers,
	createUser,
};
