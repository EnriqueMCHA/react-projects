import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function UpdateUser({ userId }) {
	const { getUserById, editUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const userInfo = getUserById(userId);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			// validaciones que tu quieras
			return setResult("ko");
		}

		editUser({ id: userId, name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Update user</Title>

			<form onSubmit={handleSubmit} className="" key={userInfo?.id}>
				<TextInput
					name="name"
					placeholder="Aquí el nombre"
					defaultValue={userInfo?.name}
				/>
				<TextInput
					name="email"
					placeholder="Aquí el email"
					defaultValue={userInfo?.email}
				/>
				<TextInput
					name="github"
					placeholder="Aquí el usuario de GitHub"
					defaultValue={userInfo?.github}
				/>

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Actualizar usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge color="green">Actualizado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
