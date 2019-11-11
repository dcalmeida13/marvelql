import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner'

export default function Details(props) {
  const GET_SERIES = gql`
  query GetSeries {
    characters(where: {id: ${props.match.params.id}}) {
      series{
        name
      }
    }
  }
  `;

  const { loading, data } = useQuery(GET_SERIES);

  if (!loading){
    var series = data.characters[0].series;
  }
     
  return(
    <div className="series-container">
      <div className="series-container-title">
        <h3>Séries</h3>
      </div>
      <div className="series-container-content">
      {loading ? (
          <div className="loader">
          <Loader
          type="Oval"
          color="#ccc"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        </div>
      ) : (
          <div className="series-content">
            {series.map(serie => (
              <p key={serie.name}>{serie.name}</p>
            ))}
          </div>
      )}
      </div> 
    </div>
  )
};


  