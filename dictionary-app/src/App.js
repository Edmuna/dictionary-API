import React, { useState } from "react";
import style from "./App.css";

export function App(props) {
  const [word, setWord] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (searchWord.trim() !== "") {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.title === "No Definitions Found") {
            setNotFound(true);
            setWord([]);
          } else {
            setNotFound(false);
            setWord(data[0]?.meanings);
          }
        })
        .catch((error) => console.log("Error fetching data:", error));
    }
    setSearchWord("");
  };

  const handleSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="nav">
        <div className="name">
          <h1>Define Me</h1>
        </div>
      </div>

      <div className="container">
        <div className="form-div">
          {notFound && <h2>Word not found. Please try again.</h2>}
          {word.length === 0 && !notFound && (
            <h2>Type the word you're looking for</h2>
          )}
          {word.map((meaning) => (
            <p key={meaning.definitions[0].definition}>
              {meaning.definitions[0].definition}
            </p>
          ))}

          <input
            className="input"
            type="text"
            value={searchWord}
            onChange={handleSearchWord}
            onKeyDown={handleKeyPress}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
