import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      return setDiaries(response.data);
    })
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/diaries', {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    })

    setDiaries(diaries.concat(response.data));
    setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message); // Accessing 'message' property after type checking
      } else {
        setErrorMessage("An unknown error occurred."); // Fallback if the error doesn't match expected type
      }
    }

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');

    setInterval(() => {
      setErrorMessage(null);
    }, 3000)
  };

  return (
    <div className="App">
      <div>
        <h2>Add new entry</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={diaryCreation}>
          <div>
            <label>date</label>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>visibility: </label>
            <span>
              <label htmlFor='great'>Great</label>
              <input type='radio' id='great' value='great' onChange={(e) => setVisibility(e.target.value)} />
            </span>
            <span>
              <label htmlFor='good'>Good</label>
              <input type='radio' id='good' value='good' onChange={(e) => setVisibility(e.target.value)} />
            </span>
            <span>
              <label htmlFor='ok'>Ok</label>
              <input type='radio' id='ok' value='ok' onChange={(e) => setVisibility(e.target.value)} />
            </span>
            <span>
              <label htmlFor='poor'>Poor</label>
              <input type='radio' id='poor' value='poor' onChange={(e) => setVisibility(e.target.value)} />
            </span>
          </div>
          <div>
            <label>weather: </label>
            <span>
              <label htmlFor='sunny'>sunny</label>
              <input type='radio' id='sunny' value='sunny' onChange={(e) => setWeather(e.target.value)} />
            </span>
            <span>
              <label htmlFor='rainy'>rainy</label>
              <input type='radio' id='rainy' value='rainy' onChange={(e) => setWeather(e.target.value)} />
            </span>
            <span>
              <label htmlFor='cloudy'>cloudy</label>
              <input type='radio' id='cloudy' value='cloudy' onChange={(e) => setWeather(e.target.value)} />
            </span>
            <span>
              <label htmlFor='stormy'>stormy</label>
              <input type='radio' id='stormy' value='stormy' onChange={(e) => setWeather(e.target.value)} />
            </span>
            <span>
              <label htmlFor='windy'>windy</label>
              <input type='radio' id='windy' value='windy' onChange={(e) => setWeather(e.target.value)} />
            </span>
          </div>
          <div>
            <label>comment</label>
            <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <button type='submit'>add</button>
        </form>
      </div>
      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
