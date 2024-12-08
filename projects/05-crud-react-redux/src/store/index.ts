import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { type UserWithId, rollbackState, usersSlice } from "./users/slice";

const persistantLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();

		next(action);

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user: UserWithId) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) =>
					toast.success(
						`El usuario ${userIdToRemove} se ha eliminado correctamente`,
					),
				)
				.catch((err) => {
					console.error(err);
					toast.error(`Error deleting user ${userIdToRemove}`);
					// Si falla la petición, restauramos el estado anterior
					if (userToRemove) store.dispatch(rollbackState(userToRemove));
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistantLocalStorageMiddleware,
			syncWithDatabaseMiddleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
