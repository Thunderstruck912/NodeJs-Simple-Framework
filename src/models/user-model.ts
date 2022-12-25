import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
	name: string;
	id: number;
}

export const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	id: { type: Number, required: true },
});

export const User = mongoose.model<UserModel>('User', UserSchema);
