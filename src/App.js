import GetCoords from './utils/getCoords'

const App = () =>(
    <div className="App">
      <h1>Previsão do tempo</h1>
      <label>
        <span>Por nome</span>
        <input type="text" placeholder="Insira o nome da cidade"/>
      </label>
      <p>ou</p>

      <label>Pela minha localização</label><br/>
      <button type="button" onClick={()=>GetCoords()}>Liberar minha localização</button>
    </div>
  );

export default App;
