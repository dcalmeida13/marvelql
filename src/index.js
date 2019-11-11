import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import App from './App';
import Series from './Series';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'https://api.marvelql.com/' }),
  resolvers: { 
    Mutation: {
      changeCharacterName : (_, args, {cache}) => {
        cache.writeData({id:`Character:${args.key}`,
          data: { 
              name: `${args.name}`
          }
        })
        return null
      },
    }
   },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/series/:id" component={Series} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
