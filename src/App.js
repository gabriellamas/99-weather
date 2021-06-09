import Input from './components/Input'
import useForm from './customHook/useForm'
import GetCoords from './utils/getCoords'


const App = () =>{
  const cityInput = useForm();

  return (
    <div className="App">
      <h1>Previsão do tempo</h1>

        <Input label="Digite um nome" type="text" {...cityInput}/>
        <button type="submit" onClick={()=>cityInput.validate()}>Buscar</button>

      <p>ou</p>

      <label>Pela minha localização</label><br/>
      <button type="button" onClick={()=>GetCoords()}>Liberar minha localização</button>
    </div>
  )};

export default App;
