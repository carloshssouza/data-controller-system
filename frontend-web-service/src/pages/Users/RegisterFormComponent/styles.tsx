import styled from 'styled-components';

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 150px;
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 70px;
  margin-bottom: 20px;
  text-align: center;

  Button {
    background: #65BA74;
    color: #fff;
    border: none;
    margin-bottom: 20px;
    font-weight: bold;
  }

`

const UsersTableContainer = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 2rem;

  Button {
    color: white;
    border: none;
    margin: 0 5px 0 0;
  }
`

export {
  RegisterFormContainer,
  UsersTableContainer
}