import './App.css';
import { useEffect, useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ paddingRight: "10px" }}>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (!good && !neutral && !bad && !all) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    ) 
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
        
          <StatisticLine text='All' value={all} />
          <StatisticLine text='Average' value={((good / 1) + (bad * -1)) / all} />
          <StatisticLine text='Positive' value={(good / all) * 100} />
        </tbody>
      </table>
    </>
  )
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  useEffect(() => {
    setAll(good + neutral + bad);
  }, [good, neutral, bad]);

  return (
    <div className="App">
      <h2>Give FeedBack</h2>
      <div className='btn-container'>
        <Button handleClick={() => setGood(good + 1)} text={"good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
}

export default App;
