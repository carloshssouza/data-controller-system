import styled from "styled-components";


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

export {
  ErrorData,
  ErrorCard
}