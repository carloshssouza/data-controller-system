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
`

const ConfigurationItem = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1rem;
  align-items: center;
  div {
    display: flex;
    height: 40px;
    align-items: center;
    background: #5454547f;
    border: none;
    border-radius: 5px;
    max-width: 100%;
    text-overflow: ellipsis;
  }
`

export {
  ConfigurationContainer,
  ConfigurationItem
}