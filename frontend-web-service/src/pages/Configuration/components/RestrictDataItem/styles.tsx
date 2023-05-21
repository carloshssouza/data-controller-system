import styled from 'styled-components'

const ConfigurationItemRestrictData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 70px;
  color: white;
`

const RestrictDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin-top: 1rem;
 
`

const RestrictDataCard = styled.div`
  background: #0000002a;
  margin: 2px;
  padding: 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  
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