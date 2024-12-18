import { type User } from "../types";

interface Props {
  users: User[];
  showColor: boolean;
  handleDelete: (email: string) => void;
}

function UserList({ users, showColor, handleDelete }: Props) {
  
  return (
    <>
      <table width={"100%"}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={showColor ? "show--color" : ""}>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.email)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
