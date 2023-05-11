import styled from 'styled-components';


const DashboardContainer = styled.div`
  margin-top: 70px;
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #27293D;
  color: white;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
`

const ErrorData = styled.div`
  display: flex;
  justify-content: space-between;
`

const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  min-width: 150px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-left: 1rem;
  div {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    margin: 0.5em 0 1em 0;
  }
  h4 {
    color: #7CD4C0;
    margin: 0 0 0.5rem 0;
  }
`

const ErrorLogCard = styled.div`
  display: flex;
  font-family: sans-serif;
  border-radius: 10px;
  background: white;
  max-height: 300px;
  overflow: auto;
  color: black;
  margin: 1rem 0 0 0;
  flex-direction: column;
  div {
    background: #ffffff;
    border: 1px outset #000000;
    padding: 0.5rem;
  }

`

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const CommonErrorContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 10px;
  margin: 0 0 1.5rem 0;
`

export {
  ErrorContainer,
  ErrorCard,
  ErrorData,
  GraphContainer,
  ErrorLogCard,
  CommonErrorContainer,
  DashboardContainer
}