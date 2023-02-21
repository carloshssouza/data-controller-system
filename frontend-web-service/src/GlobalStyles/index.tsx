import styled, { createGlobalStyle, keyframes } from 'styled-components';

const PageTransition = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  opacity: 0;
  animation: ${PageTransition} 1s ease forwards;
`;

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;1,400;1,700&display=swap');

  body {
    font-family: "Roboto", sans-serif;
    background: #1E1E2D;
    font-weight: 300;
  }
`;

export {
  GlobalStyles,
  Container
}
