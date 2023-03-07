import styled from 'styled-components'

const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 150px; */
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 70px;
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

const ConfigurationItem = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1rem;
  align-items: center;
  div {
    margin: 0 0.5rem 0 0.5rem;
    display: flex;
    align-items: center;
    background: #1B1D2B;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    max-width: 100%;
    text-overflow: ellipsis;
  }

  Button {
    border: none;
    font-weight: bold;
  }
`

const ConfigurationItemRestrictData = styled.div`
  display: flex;
  flex-direction: column;
`

export {
  ConfigurationContainer,
  ConfigurationItem,
  ConfigurationItemRestrictData,
  ConfigurationContainerRestrict
}