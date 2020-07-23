import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [])

  const fetchValues = async () => {
    const values = await Axios.get('/api/values/current');
    setValues(values.data);
  }

  const fetchIndexes = async () => {
    const indexes = await Axios.get('/api/values/all');
    setSeenIndexes(indexes.data);
  }

  const renderSeenIndexes = () => {
    return seenIndexes.map(({number}) => number).join(', ');
  }

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      )
    }
    return entries;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Axios.post('/api/values', {
      index: index
    })

    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your index:
        </label>
        <input 
          value={index} 
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  )
}