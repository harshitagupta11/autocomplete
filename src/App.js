import React, { useEffect, useState, useRef } from "react";
//import logo from "./logo.svg";
import "./App.css";
import countries from './countries.json';
 const countrie =countries.map(country=>{
  country.Country=country.Country.toLowerCase()
   return country
})
//const countries = fs.readFile();
//console.log(countrie[0]);
const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  useEffect(() => {
    setOptions(countrie);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({Country}) => Country.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.Country)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.Country}</span>
                  
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;