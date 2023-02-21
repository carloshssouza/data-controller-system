import styled from 'styled-components';

const ConfigurationContainer = styled.div`
    background: #27293D;
    height: 100%;
    width: 100%;
    padding: 0.3rem 1rem 0.3rem 1rem;
    border-radius: 10px;
    transition: all 0.5s ease;
    h1{
      margin-bottom: 2rem;
    }
    Form {
      display: flex;
      justify-content: center;
      Input {
        width: 300px;
      }
      Button {
        font-weight: bold;
        margin-left: 1rem;
        background: #65BA74;
        border: none;
        color: white;
      }
    }
`

export {
  ConfigurationContainer
}