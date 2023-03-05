import Routes from './routes'
import { GlobalStyles } from './GlobalStyles';
import ConfigurationContext from './context/Configuration/ConfigurationContext';
import { useState } from 'react';
import { IConfigurationResponse } from './context/Configuration/interfaces';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes />  
    </>
  )
}

export default App
