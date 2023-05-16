import styled from 'styled-components'

const UserContainer = styled.div`
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

const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #17181e;
  margin-bottom: 1rem;
  padding: 5px;
  border-radius: 5px;

`

export {
  UserContainer,
  UserItem
}