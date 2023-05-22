import styled from "styled-components";

interface LogsItemProps {
  level: string
}

const LogsContainer = styled.div`
  background: #0000006f;
  border-radius: 3px;
  padding: 5px;
  max-height: 200px;
  overflow-y: auto;
  .modal-custom .ant-modal.content .ant-modal-header {
    background: black !important;
  }
`
const LogsItem = styled.div`
  display: flex;
  background: black;
  color: white;
  justify-content: space-between;
  margin: 5px 0 5px 0;
  border-left: 5px solid ${(props: LogsItemProps) => props.level === 'high' ? '#F05D5D' : props.level === 'medium' ? '#FFD81D' : '#7EED79'};
  padding: 10px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  :hover {
    cursor: pointer;
    background: #a0a0a059;
  }
`

const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const ModalDataItem = styled.div`
  border-radius: 3px;
`

export {
  LogsItem,
  LogsContainer,
  ModalBodyContainer,
  ModalDataItem
}