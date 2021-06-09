import Input from './components/Input'
import useForm from './customHook/useForm'
import GetCoords from './utils/getCoords'
import Styles from './App.module.css';

const App = () =>{
  const cityInput = useForm();

  const getWeatherByCity = ()=>{
    if(cityInput.validate()){
      console.log('Vamos buscar')
    }
  }

  const handleGetCoords = ()=>{
    GetCoords()
  }

  return (
    <div className={Styles.Wrapper}>
      <h1 className={Styles.Title}>Previsão do tempo</h1>

      <Input label="Digite uma cidade" type="text" placeholder="Ex: London, São Paulo" {...cityInput}/>
      <button type="submit" onClick={getWeatherByCity}>Buscar</button>

      <p className={Styles.Divisor}>ou</p>

      <label className={Styles.Label}>Pela minha localização</label>
      <button type="button" onClick={handleGetCoords}>Liberar minha localização</button>
    </div>
  )};

export default App;
