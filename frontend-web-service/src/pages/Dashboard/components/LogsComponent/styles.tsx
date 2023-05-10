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
`

export {
  LogsItem,
  LogsContainer
}