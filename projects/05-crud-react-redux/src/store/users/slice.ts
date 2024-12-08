import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: UserWithId[] = [
	{
		id: "1",
		name: "Enrique Chacón",
		email: "enrique.chacon@gmail.com",
		github: "EnriqueMCHA",
	},
	{
		id: "2",
		name: "Oriana Blanco",
		email: "oriana.blanco@gmail.com",
		github: "oriana",
	},
	{
		id: "3",
		name: "Midu",
		email: "midu.dev@gmail.com",
		github: "midudev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistantState = localStorage.getItem("__redux__state__");
	return persistantState ? JSON.parse(persistantState).users : INITIAL_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();

			// Usando immer con react redux toolkit se puede mutar el estado, por eso se puede hacer el push directamente
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		updateUser: (state, action: PayloadAction<UserWithId>) => {
			const index = state.findIndex((user) => user.id === action.payload.id);
			if (index !== -1) {
				// Usando immer, se puede mutar el estado y por eso se puede hacer el replace directamente
				state[index] = action.payload;
			}
		},
		rollbackState: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);

			// Usando immer con react redux toolkit se puede mutar el estado, por eso se puede hacer el push directamente
			if (!isUserAlreadyDefined) state.push(action.payload);
		},
	},
});

export const { addNewUser, deleteUserById, updateUser, rollbackState } =
	usersSlice.actions;
