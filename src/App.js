import Input from './components/Input'
import useForm from './customHook/useForm'
import GetCoords from './utils/getCoords'
import { FiMapPin } from "react-icons/fi";
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

      <div className={Styles.WrapperInputs}>
        <div className={Styles.WrapperInputCity}>
          <Input label="Digite uma cidade" type="text" placeholder="Ex: London, São Paulo" {...cityInput}/>
          <button type="submit" onClick={getWeatherByCity}>Buscar</button>
        </div>
        <div className={Styles.WrapperLocationOption}>
          <p>Prefere usar sua localização? </p><button onClick={handleGetCoords} className="link-style">Permitir localização <FiMapPin size={12}/></button>
        </div>
      </div>
    </div>
  )};

export default App;
