import React, { useEffect, useState, useCallback } from 'react'

import Input from './components/Input'
import useForm from './customHook/useForm'
import { FiMapPin } from 'react-icons/fi'
import api from './Api'
import Loading from './components/Loading'
import dateFormat from './utils/dateFormat'
import Styles from './App.module.css'

const App = () => {
  const cityInput = useForm()
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [coords, setCoords] = useState(null)
  const [cities, setCities] = useState(null)

  const [cityWeather, setCityWeather] = useState(() => {
    if (window.localStorage.getItem('cityWeather')) {
      return JSON.parse(window.localStorage.getItem('cityWeather'))
    }
    return null
  })

  const formatTheCitysWeather = useCallback(async (data) => {
    const WeatherStates = {
      sn: 'Nevando',
      sl: 'Chuva de granizo',
      h: 'Chuva de granizo',
      t: 'Trovejando',
      hr: 'Chuva forte',
      lr: 'Chuva leve',
      s: 'Temporais',
      hc: 'Tempo fechado',
      lc: 'Sol entre nuvens',
      c: 'Céu limpo'
    }
    const days = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feita',
      'sábado'
    ]
    const dateToday = new Date()
    const dateTodayFormated = dateFormat(dateToday)
    const cityWeatherInfoFormated = data.consolidated_weather
      .filter(
        (weatherinfo) =>
          dateFormat(weatherinfo.applicable_date) >= dateTodayFormated
      )
      .map((weatherinfo, index) => {
        let customDayName
        let realDayName
        let formatedMinTemp = weatherinfo.min_temp.toFixed(2)
        let formatedMaxTemp = weatherinfo.max_temp.toFixed(2)
        let weatherTradution = WeatherStates[weatherinfo.weather_state_abbr]

        if (dateFormat(weatherinfo.applicable_date) === dateTodayFormated) {
          customDayName = 'Hoje'
          realDayName = new Date(weatherinfo.applicable_date).getDay()
        }
        if (index === 1) {
          customDayName = 'Amanhã'
          realDayName = new Date(weatherinfo.applicable_date).getDay()
        }
        realDayName = days[new Date(weatherinfo.applicable_date).getDay()]

        return {
          ...weatherinfo,
          customDayName,
          realDayName,
          weatherTradution,
          formatedMinTemp,
          formatedMaxTemp
        }
      })

    window.localStorage.setItem(
      'cityWeather',
      JSON.stringify({
        ...data,
        consolidated_weather: [...cityWeatherInfoFormated]
      })
    )
    setCityWeather({
      ...data,
      consolidated_weather: [...cityWeatherInfoFormated]
    })
  }, [])

  const getWeatherByWoeid = useCallback(
    async (woeid) => {
      window.localStorage.clear()
      setLoading(true)
      try {
        const cityWeather = await api.get(`/${woeid}`)
        formatTheCitysWeather(cityWeather.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [formatTheCitysWeather]
  )

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        setCoords({ lat, long })
      },
      (responseError) => {
        setError(responseError.message)
        return false
      }
    )
    setLoading(false)
  }

  const getCityListByCoords = useCallback(async (coords) => {
    window.localStorage.clear()
    setError(null)
    setLoading(true)
    try {
      const response = await api.get(
        `/search/?lattlong=${coords.lat},${coords.long}`
      )
      if (response.data.length > 0) {
        setCities(response.data)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const getCityListByName = useCallback(async () => {
    if (cityInput.validate()) {
      window.localStorage.clear()
      setCityWeather(null)
      setError(null)
      setLoading(true)
      try {
        const response = await api.get(`/search/?query=${cityInput.value}`)
        if (response.data.length > 0) {
          const cities = response.data
          setCities(cities)
        } else {
          setError('Nenhuma cidade encontrada')
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }, [cityInput])

  useEffect(() => {
    if (coords && !cityWeather) getCityListByCoords(coords)
  }, [coords, getCityListByCoords, cityWeather])

  return (
    <>
      {console.log('cityWeather', cityWeather)}
      {console.log('coords', coords)}
      {console.log('cities', cities)}
      <div className={Styles.WrapperTitle}>
        <h1 className={Styles.Title}>Previsão do tempo</h1>
      </div>

      <div className={Styles.WrapperInputs}>
        <div className={Styles.ContainerInputs}>
          <div className={Styles.ContainerInputCity}>
            <Input
              label="Digite uma cidade"
              type="text"
              placeholder="Ex: London, São Paulo"
              {...cityInput}
            />
            <button type="submit" onClick={getCityListByName}>
              Buscar
            </button>
          </div>
          <div className={Styles.ContainerLocationOption}>
            <p>Prefere usar sua localização? </p>
            <button onClick={getCoords} className="link-style">
              Localizar agora <FiMapPin size={12} />
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.WrapperResult}>
        {(loading || error || cityWeather || cities) && (
          <div className={Styles.ContainerResult}>
            {loading && <Loading />}
            {error && <p className={Styles.ErrorTitle}>{error}</p>}
            {cities &&
              !cityWeather &&
              cities.map((city, index) => (
                <div key={index} onClick={() => getWeatherByWoeid(city.woeid)}>
                  <p>{city.title}</p>
                </div>
              ))}
            {cityWeather && (
              <>
                <h2>{cityWeather.title}</h2>
                {cityWeather.consolidated_weather.map((weather, index) => (
                  <div className={Styles.WeatherInfoContainer} key={index}>
                    <div className={Styles.WeatherDateTempContainer}>
                      <h3>{weather.customDayName || weather.realDayName}</h3>
                      <h6>{weather.weatherTradution}</h6>
                      <div className={Styles.MinMaxTempContainer}>
                        <p>{weather.formatedMinTemp}ºC</p>
                        <p>{weather.formatedMaxTemp}ºC</p>
                      </div>
                    </div>
                    <img
                      width="24px"
                      src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
                      alt="icon"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
