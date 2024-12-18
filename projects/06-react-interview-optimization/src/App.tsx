import { SortBy } from "./types.d";
import "./App.css";
import UserList from "./components/UserList";
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    users,
    showColor,
    toggleColor,
    toggleSortByCountry,
    restoreInitialState,
    handleDelete,
    handleFitlerCountry,
    sortedUsers,
    sorting,
  } = useUsers();

  return (
    <>
      <h1>Lista de usuarios de la API Random User</h1>

      <main>
        <button onClick={toggleColor}>Cambiar color</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? "Mostrar todos" : "Filtrar por país"}
        </button>
        <button onClick={restoreInitialState}>Restaurar estado inicial</button>
        <input
          type="text"
          placeholder="Buscar por país"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFitlerCountry(event)
          }
        />
      </main>

      {users.length > 0 && (
        <UserList
          users={sortedUsers}
          showColor={showColor}
          handleDelete={handleDelete}
        />
      )}

      {isLoading && <b>Cargando...</b>}

      {isError && <p>Error al cargar los usuarios</p>}

      {!isError && users.length === 0 && <p>No hay usuarios disponibles</p>}

      {!isLoading && !isError && hasNextPage && users.length > 0 && (
        <button onClick={() => fetchNextPage()}>Cargar más resultados</button>
      )}

      {!isLoading && !isError && !hasNextPage && <p>No hay más usuarios</p>}
    </>
  );
}

export default App;
