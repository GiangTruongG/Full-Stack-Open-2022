import './App.css';
import axios from 'axios';
import { useState } from 'react';
import LessThanTen from './Components/LessThanTen/LessThanTen';
import CountryDetails from './Components/CountryDetails/CountryDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [manyResults, setManyResults] = useState(false);
  const [lessThanTen, setLessThanTen] = useState([]);
  const [oneCountry, setOneCountry] = useState([]);
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  const resultsController = (manyResults, lessThanTen, onlyOne) => {
    setManyResults(manyResults);
    setOneCountry(onlyOne);
    setLessThanTen(lessThanTen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    let searchStr = event.target.value;

    if (event.target.value === '') {
      setManyResults(false);
      setLessThanTen([]);
      return;
    } else {
      axios.get(`https://restcountries.com/v3.1/name/${searchStr.replace(/\s+/g, '')}`)
      .then(response => {
        if (response.data.length > 10) {
          resultsController(true, [], []);
        } else if (response.data.length <= 10 && response.data.length > 1) {
          resultsController(false, response.data, []);
        } else {
          resultsController(false, [], oneCountry.concat(response.data[0]));
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].capitalInfo.latlng[0]}&lon=${response.data[0].capitalInfo.latlng[1]}&appid=${api_key}`)
            .then(response => {
              setWeather([response.data]);
            })
        }
      })
    }
  };

  const handleShow = (code) => {
    axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(response => {
        resultsController(false, [], oneCountry.concat(response.data[0]));
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].capitalInfo.latlng[0]}&lon=${response.data[0].capitalInfo.latlng[1]}&appid=${api_key}`)
            .then(response => {
              setWeather([response.data]);
            })
      });
  };

return (
  <div className="App">
      <form>
        <label>Find Countries:</label>
        <input type='text' value={searchTerm} onChange={handleSearch} />
      </form>
      {manyResults ? <p>Too many matches! Specify another filter!</p> : null}
      <LessThanTen countries={lessThanTen} handleShow={handleShow} />
      <CountryDetails country={oneCountry} weather={weather} />
  </div>
);
}

export default App;
