import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isValidJson, setIsValidJson] = useState(false);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsedJson = JSON.parse(jsonInput);
      const { data } = await axios.post('https://your-app-name.herokuapp.com/bfhl', parsedJson);
      setResponse(data);
      setIsValidJson(true);
    } catch (err) {
      setError('Invalid JSON or API call failed');
      setIsValidJson(false);
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filteredResponse.highestAlphabet = response.alphabets?.[0];

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>12345</h1>
        <form onSubmit={handleSubmit}>
          <textarea value={jsonInput} onChange={handleJsonChange} rows="10" cols="50" placeholder='Enter JSON here...'/>
          <br />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isValidJson && (
          <div>
            <label htmlFor="options">Select options:</label>
            <select id="options" multiple onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest alphabet">Highest alphabet</option>
            </select>
          </div>
        )}
        {renderResponse()}
      </header>
    </div>
  );
};

export default App;
