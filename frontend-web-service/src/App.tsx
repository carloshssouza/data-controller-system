import Login from './pages/Login'
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from './themes/Themes'

import Routes from './routes'
import { useState } from 'react';

const ThemeType = {
  body: lightTheme,
  text: darkTheme

}
export const GlobalStyles = createGlobalStyle<{ theme: typeof ThemeType }>`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;1,400;1,700&display=swap');
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Roboto, sans-serif;
    transition: all 0.50s linear;
  }`


function App() {
  return (
    <>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyles />
        </ThemeProvider>
        <Routes />
    </>
  )
}

export default App
