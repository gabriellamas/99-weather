import React, {useEffect, useState, useCallback} from 'react'

import Input from './components/Input'
import useForm from './customHook/useForm'
import { FiMapPin } from 'react-icons/fi';
import api from './Api';
import Loading from './components/Loading'
import Styles from './App.module.css';


const App = () =>{

  const cityInput = useForm();
  const [loading, setLoading] = useState(false)
  const [coords, setCoords] = useState(()=>{
    if(window.localStorage.getItem('coords')){
      return JSON.parse(window.localStorage.getItem('coords'))
    }
    return null
  })

  const [cityWeather, setCityWeather] = useState(()=>{
    if(window.localStorage.getItem('cityWeather')){
      return JSON.parse(window.localStorage.getItem('cityWeather'))
    }
    return null
  })


  const getWeatherByCity = ()=>{
    if(cityInput.validate()){
      console.log('Vamos buscar')
    }
  }

  const getCoords = () =>{
    navigator.geolocation.getCurrentPosition(  
        async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        window.localStorage.setItem(
          'coords',
          JSON.stringify({ lat, long }),
        );
        setCoords({lat, long})
      },
      (responseError) => {
        // eslint-disable-next-line
        console.log(responseError.message);
        return false
      },
    );
    setLoading(false)
  }

  const getWeatherByCoords = useCallback(async(coords)=>{
    setLoading(true) 
    try {
      const cities= await api.get(`/search/?lattlong=${coords.lat},${coords.long}`)
      const cityWoeid = cities.data[0].woeid

      const cityWeather = await api.get(`/${cityWoeid}`)
      console.log('cityWeather', cityWeather)
      setCityWeather(cityWeather)
      setLoading(false) 
    } catch (error) {
      console.error(error)
    } 
  },[])

  useEffect(()=>{
    if(coords && !cityWeather)getWeatherByCoords(coords)
  },[coords, getWeatherByCoords, cityWeather])


  return (
    <>
      {loading && <Loading/>}
      <div className={Styles.Wrapper}>
        <h1 className={Styles.Title}>Previsão do tempo</h1>

        <div className={Styles.WrapperInputs}>
          <div className={Styles.WrapperInputCity}>
            <Input label="Digite uma cidade" type="text" placeholder="Ex: London, São Paulo" {...cityInput}/>
            <button type="submit" onClick={getWeatherByCity}>Buscar</button>
          </div>
          <div className={Styles.WrapperLocationOption}>
            <p>Prefere usar sua localização? </p><button onClick={getCoords} className="link-style">Permitir localização <FiMapPin size={12}/></button>
          </div>
        </div>
        {coords && <h2>tem coords</h2>}
        {cityWeather && <h2>tem weather</h2>}
      </div>

    </>


  )};

export default App;
