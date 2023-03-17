import styled from 'styled-components';

const UserContainer = styled.div`
    background: #27293D;
    border-radius: 10px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    h1{
      margin-bottom: 2rem;
    }

    Form {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-top: 2rem;
      margin-bottom: 1rem;
      Button {
        font-weight: bold;
        /* margin-left: 1rem; */
        /* background: #65BA74; */
        border: none;
        /* color: white; */
        margin-bottom: 1rem;
      }
    }
`
export {
  UserContainer
}