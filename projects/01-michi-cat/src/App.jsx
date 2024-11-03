import { useState } from 'react';
import './App.css'
import useCatFact from './hooks/useCatFact';

function App() {

  const [inputSearch, setInputSeach] = useState("Ori y Rike ♥");
  const { cat, isLoadingGetCat, getCat, handleSearch } = useCatFact();


  return (
    <main>
      <h1>Generador de imágenes de michis {"<3"} </h1>
      {
        cat !== "" && (
          <img src={cat} width={"400px"} height={"400px"} alt="Imagen no procesada"/>
        )
      }

      <div className="buttons-group">
        <input value={inputSearch} onChange={(event) => setInputSeach(event.target.value)} />
        <button onClick={() => handleSearch({ searchValue: inputSearch })} disabled={isLoadingGetCat}>{isLoadingGetCat ? "Cargando..." : "Buscar"}</button>
        <button onClick={getCat} disabled={isLoadingGetCat}>{isLoadingGetCat ? "Cargando..." : "Texto aleatorio"}</button>
      </div>
    </main>
  )
}

export default App
