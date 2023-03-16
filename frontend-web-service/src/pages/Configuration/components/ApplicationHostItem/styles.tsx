import styled from 'styled-components'
import { Modal} from 'antd'
const ConfigurationItem = styled.div`
  display: flex;
  max-width: 100%;
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
    /* max-width: 100%; */
    max-width: 100%;
    /* text-overflow: ellipsis; */
  }

  Button {
    border: none;
    font-weight: bold;
  }
`

const ModalContainer = styled(Modal)`
width: 100%;
  Form {
    background: red;
    display: flex;
    Input {
      width: 100% !important;
    }
  }
`

export {
  ConfigurationItem,
  ModalContainer
}