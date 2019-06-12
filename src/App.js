import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      {/* <Header/>*/}
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
