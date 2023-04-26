import React from 'react'

const CountryDetails = ({ country, weather }) => {
    if (country.length === 0) {
        return null;
    }

    const languages = Object.values(country[0].languages);

  return (
    <>
        <h2>{country[0].name.common}</h2>
        <p>Capital: {country[0].capital}</p>
        <p>Area: {country[0].area   }</p>
        <h3>Languages</h3>
        <ul>
            {languages.map(language => (
                <li>{language}</li>
            ))}
        </ul>
        <img src={country[0].flags.png} alt='img' />
        <h3>Weather in {weather[0]?.name}</h3>
        <img src={`https://openweathermap.org/img/wn/${weather[0]?.weather[0].icon}@2x.png`} alt='img-weather' />
        <p>Wind: {weather[0]?.wind.speed} m/s</p>
    </>
  )
}

export default CountryDetails