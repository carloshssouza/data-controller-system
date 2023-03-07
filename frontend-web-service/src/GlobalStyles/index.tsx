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
  opacity: 0;
  animation: ${PageTransition} 1s ease forwards;
`;

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;1,400;1,700&display=swap');

  body {
    max-height: 100vh;
    font-family: "Roboto", sans-serif;
    background: #1E1E2D;
    font-weight: 300;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
  }
`;

export {
  GlobalStyles,
  Container
}
