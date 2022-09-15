import { useEffect, useState } from 'react';

import CardList from './components/CardList/CardList';
import SearchBox from './components/SearchBox/SearchBox';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users)
      )
  }, [])

  console.log("render");
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])


  const onSearchChange = (event) => {
    setSearchField(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search monster"
        className="monsters-search-box"
      />

      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
