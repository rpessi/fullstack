import { useState, useEffect } from 'react'
import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherBaseURL = 'https://api.open-meteo.com/v1/forecast?'

const weatherIcons = []
weatherIcons[0] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/1.svg'
weatherIcons[1] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/2.svg'
weatherIcons[2] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/4.svg'
weatherIcons[3] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/7.svg'
weatherIcons[45] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/9.svg'
weatherIcons[48] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/9.svg'
weatherIcons[51] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/11.svg'
weatherIcons[53] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/11.svg'
weatherIcons[55] = 'http://openweathermap.org/img/wn/09d@2x.png'
weatherIcons[56] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/14.svg'
weatherIcons[57] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/14.svg'
weatherIcons[61] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/37.svg'
weatherIcons[63] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/38.svg'
weatherIcons[65] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/39.svg'
weatherIcons[66] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/17.svg'
weatherIcons[67] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/17.svg'
weatherIcons[71] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/57.svg'
weatherIcons[73] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/58.svg'
weatherIcons[75] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/59.svg'
weatherIcons[77] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/67.svg'
weatherIcons[80] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/21.svg'
weatherIcons[81] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/24.svg'
weatherIcons[82] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/27.svg'
weatherIcons[85] = 'http://openweathermap.org/img/wn/13d@2x.png'
weatherIcons[86] = 'http://openweathermap.org/img/wn/13d@2x.png'
weatherIcons[95] = 'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p/77.svg'
weatherIcons[96] = 'http://openweathermap.org/img/wn/11d@2x.png'
weatherIcons[99] = 'http://openweathermap.org/img/wn/11d@2x.png'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      <div>
        Find countries <input value={filter} onChange={handleFilterChange} />
      </div>
    </>
  )
}

const CountryView = ({ filteredNames, responseData, selectCountry, weatherData }) => {
  if (filteredNames.length === 0) {
    return (
      <p>No countries with this filter</p>
    )
  }
  else if (filteredNames.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (filteredNames.length === 1) {
    const countryName = filteredNames[0]
    const selectedCountry = responseData.filter(country => 
      country.name.common.toLowerCase().includes(countryName.toLowerCase()))[0]
    const flagText = `Flag of ${selectedCountry.name}`
    return (
        <>
        <h3>{selectedCountry.name.common}</h3>
        <p>Capital: {selectedCountry.capital[0]}</p>
        <p>Area: {selectedCountry.area}</p>
        <h4>Languages:</h4>
        <ul>
          <LanguageList languages={Object.values(selectedCountry.languages)}/>
        </ul>
        <p></p>
        <img src={selectedCountry.flags.png} alt={flagText} />
        <p></p>
        <Weather country={selectedCountry} weatherData={weatherData} />
        </>
    )
  }
  else {
    return (
      <>
        <ul style={{listStyle:'none', marginLeft: '0px'}}>
          <NameList
            filteredNames={filteredNames}
            selectCountry={selectCountry}
          />
        </ul>
      </>
    )
  }
}

const Weather = ({ country, weatherData }) => {
  const capital = country.capital[0]
  const temperature = weatherData.temp + weatherData.tempunit
  const wind = weatherData.wind + weatherData.windunit
  const iconURL = weatherIcons[weatherData.code]
  return (
    <>
    <h4>Weather in {capital}</h4>
    <p>Temperature {temperature}</p>
    <p>Wind {wind}</p>
    <p></p>
    <img src={iconURL} className={'weather'}/>
    </>
  )

}

const LanguageList = ({ languages }) => {
  const renderLanguages = languages.map((language) => 
    <li key={language}>{language}</li>)
  return renderLanguages
}

const NameList = ({ filteredNames, selectCountry }) => {
  const renderNames = filteredNames.map((name) => 
    <li key={name}>{name}
    <button onClick={() => selectCountry(name)}>Show</button>
    </li>)
  return renderNames
}

const App = () => {
  const [responseData, setResponseData] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const [names, setNames] = useState([]) /* names of countries */
  const [filter, setFilter] = useState('')
  const [filteredNames, setFilteredNames] = useState([])

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        const data = response.data
        setResponseData(data)
        const countryNames = data.map(country => country.name.common)
        setNames(countryNames)
      })
      .catch(error => {
      })
  }, [])

  const handleFilterChange = (event) => {
    const formfield = event.target.value
    setFilter(formfield)
    const newFiltered = names.filter((name) => 
      name.toLowerCase().includes(formfield.toLowerCase()))
    setFilteredNames(newFiltered)
    if (newFiltered.length === 1) {
      selectCountry(newFiltered[0])
    }
  }

  const selectCountry = name => {
    const selectedCountry = responseData.filter(country => 
      country.name.common.toLowerCase().includes(name.toLowerCase()))[0]
    const latitude = selectedCountry.latlng[0]
    const longitude = selectedCountry.latlng[1]
    const weatherURL = `${weatherBaseURL}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,windspeed_10m&wind_speed_unit=ms`
    axios.get(weatherURL)
      .then(response => {
        const data = response.data
        const weather = {
          temp: data.current.temperature_2m,
          tempunit: data.current_units.temperature_2m,
          wind: data.current.windspeed_10m,
          windunit: data.current_units.windspeed_10m,
          code: data.current.weather_code
        }
        setWeatherData(weather)
      })
      .catch(error => {
      })
    setFilteredNames([name])
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <ul>
        <CountryView
          filteredNames={filteredNames}
          responseData={responseData}
          selectCountry={selectCountry}
          weatherData={weatherData}
        />
      </ul>
    </div>
  )
}

export default App
