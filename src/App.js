import React, { Component } from 'react';
import './App.css';
import Layout from './HOC/Layout/Layout';
import Chatterbox from './Containers/Chatterbox/Chatterbox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Chatterbox />
        </Layout>
      </div>
    );
  }
}

export default App;
