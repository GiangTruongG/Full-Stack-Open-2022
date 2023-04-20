import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(null);
  const [votes, setVotes] = useState(Array(8).fill(0))
  const [maxIndex, setMaxIndex] = useState(null);

  console.log(votes);

  const getMaxIndex = () => {
    let max = votes[0];
    let index = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        index = i;
      }
    };

    return index;
  };

  useEffect(() => {
    if (votes.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) {
      setMaxIndex(getMaxIndex());
    }
  }, [votes]);

  const handleVote = async () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const handleClick = () => {
    const getRandomNum = () => {
      let randomNum = Math.round(Math.random() * 10);

      if (randomNum < 8) {
        return randomNum
      } else {
        return getRandomNum()
      }
    }

    setSelected(getRandomNum);
  };

  return (
    <div className="App">
      <h2>Anecdote of the day</h2>
      <h3>{anecdotes[selected]}</h3>
      {votes[selected] ? <h4>Has {votes[selected]}</h4> : <></>}
      {selected == null ? <></> : <button onClick={handleVote}>vote</button>}
      {selected == null ? <button onClick={handleClick}>show anecdote</button> : <button onClick={handleClick}>next anecdote</button>}
      <h2>Anecdote with most votes</h2>
      <h3>{anecdotes[maxIndex]}</h3>
      <h4>Has {votes[maxIndex]}</h4>
    </div>
  );
}

export default App;
