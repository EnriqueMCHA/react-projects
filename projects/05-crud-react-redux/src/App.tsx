import "./App.css";
import { Toaster } from "sonner";
import { CreateNewUser } from "./components/CreateNewUser";
import ListOfUsers from "./components/ListOfUsers";
import { UpdateUser } from "./components/UpdateUser";

function App() {
	return (
		<>
			<h1 className="text-4xl font-bold text-center mb-4">
				CRUD God React + TS | Biome Tools, Redux Toolkit, Tremor
			</h1>

			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
