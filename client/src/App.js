import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';
import logo from './logo.png';

const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="SpaceX"
              style={{ width: 300, display: 'block', margin: 'auto' }}
            />
            <Routes>
              <Route path="/" element={<Launches />} />
              <Route path="/launch/:id" element={<Launch />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;