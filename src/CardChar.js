import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {Link} from 'react-router-dom';

const MUTATION_CHAR = gql`
  mutation ($key: key,$name: name){
    changeCharacterName(key: $key, name: $name) @client
  }
`

function handleSubmit(event){
  event.preventDefault();
}

export default function CardChar(props){
  const [nameChar,setNameChar] = useState(props.character.name);

  const [mutChar] = useMutation(
    MUTATION_CHAR,
    {variables:{
      key: props.character.id,
      name: nameChar
    }}
  )
  
  function editDetails(event){
    event.preventDefault();
    var parent = event.target.parentElement.parentElement;
    var form = parent.children[2];
    form.classList.toggle('active');
  }

  return(
    <div className="card">
      <div className="card-char-container">
      <img src={props.character.thumbnail} alt="" height="30"/>
      <p>{nameChar}</p>
      </div>
      <div className="card-option-edit">
        <button onClick={(event) => editDetails(event)}>Editar personagem</button>
        <Link to={`/series/${props.character.id}`}>Ver detalhes</Link>
      </div>
      <div className="form-container">
        <p>Edite o nome do seu personagem:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(event)=>setNameChar(event.target.value)}
            placeholder="Entre com um nome"></input>
            <br></br>
          <button type="submit" onClick={mutChar}>Salvar</button>
        </form>
      </div>
    </div>
  )
} 