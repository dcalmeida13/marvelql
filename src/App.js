import React, { useState} from 'react';
import './App.css';
import gql from 'graphql-tag';
import CardChar from './CardChar';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner'

export default function App() {
  const [filter,setFilter] = useState([]);
  const GET_CHARS = gql`
    query GetCharacters {
      characters {
        id
        name
        thumbnail
        description
      }
    }`

  const { loading, data } = useQuery(GET_CHARS)
  
  React.useEffect(()=> {
    if (data){
      setFilter(data.characters);
    }
  },[data])

  function handleChange(event){
    setFilter(data.characters.filter(char => {
      var target = event.target.value;
      var name = char.name;
      return (name.indexOf(target) !== -1)
    }))
  }

  return (
    <div className="main-container">
      <div className="logos-container">
        <img src={require('./img/marvel-logo.svg')} alt="" height="50"/>
        <br/>
        <img src={require('./img/marvelql.png')} alt="" height="65"/>
      </div>
      <input 
       className="search-bar"
       type="search"
       onChange={handleChange}
       placeholder="Pesquise o seu personagem"></input>
      <>
      <div className="cards-container">
      {loading ? (
        <div className="loader">
          <Loader
          type="Oval"
          color="#ccc"
          height={100}
          width={100}
          timeout={3000} //3 secs
          />
        </div>) : (
      <>
        {filter.map(char => (
          <CardChar 
          key={char.id}
          character={char}/>
          ))}
        </>
      )}
        </div>
    </>
    </div>
  );
}