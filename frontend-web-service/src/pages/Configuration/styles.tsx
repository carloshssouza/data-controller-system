import styled from 'styled-components'

const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 150px; 
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 70px;

  Button {
    margin: 0 0.5rem 0 0.5rem;
  }
`


const ConfigurationContainerRestrict = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 150px;
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 1rem; 

`

export {
  ConfigurationContainer,
  ConfigurationContainerRestrict,
}