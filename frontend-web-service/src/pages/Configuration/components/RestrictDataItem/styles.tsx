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

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  div {
    text-align: center;
  }

  Button {
    margin-bottom: 0.5rem;
    border: none;
    background: #65BA74;
    color: #fff;
    font-weight: bold;
  }
`

const UniqueRestrictDataItem = styled.div`
  border: 1px solid #fffcfc27;
  width: 100%;
  display: flex;
  height: 35px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0 !important;
  transition: all 0.5s ease-in-out;
  :hover {
    background: #567173;
    cursor: pointer;
  }
`

export {
  ConfigurationItemRestrictData,
  RestrictDataContainer,
  RestrictDataCard,
  UniqueRestrictDataItem,
  CardContent
}