import styled from 'styled-components'

const ConfigurationItemRestrictData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const RestrictDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
`

const RestrictDataCard = styled.div`
  background: #1B1D2B;
  margin: 2px;
  padding: 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    margin-bottom: 0.5rem;
  }
`

export {
  ConfigurationItemRestrictData,
  RestrictDataContainer,
  RestrictDataCard,
}