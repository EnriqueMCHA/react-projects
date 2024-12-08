import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
	type User,
	type UserId,
	type UserWithId,
	addNewUser,
	deleteUserById,
	updateUser,
} from "../store/users/slice";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const getUserById = (id: UserId) => {
		const users = useAppSelector((state) => state.users);
		const user = users.find((user) => user.id === id);
		return user;
	};

	const createUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const editUser = ({ id, name, email, github }: UserWithId) => {
		dispatch(updateUser({ id, name, email, github }));
	};

	return { getUserById, createUser, editUser, removeUser };
};
