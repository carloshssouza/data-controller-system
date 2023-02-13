import styled from 'styled-components'

const ApiAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 150px;
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 2rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px 0 2px;
    Form {
      display: flex;
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
      }

      Button {
        background: #65BA74;
      }
    }
  }
`

const ApiListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #27293D;
  margin-top: 2rem;

  Table {
    
  }
  
`

export {
  ApiAddContainer,
  ApiListContainer
}