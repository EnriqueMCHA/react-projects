import { TwitterFollowCard } from "./TwitterFollowCard.jsx";
import "./App.css";

export function App() {
	return (
		<>
			<TwitterFollowCard userName={"a"} name={"Mi primer componente"} isVerified={true}/>
			<TwitterFollowCard userName={"L3ugimm"} name={"Enrique.sql"} isVerified={true}/>
			<TwitterFollowCard userName={"a"} name={"Mi primer componente"} isVerified={false}/>
		</>
	)
}