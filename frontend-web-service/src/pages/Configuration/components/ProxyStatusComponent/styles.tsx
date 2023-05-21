import styled from "styled-components";

interface ProxyStatusItemProps {
  isRunning: boolean
}

const ProxyStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 0.5rem;
`

const ProxyStatusItem = styled.div<ProxyStatusItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background: #0000004a;
  padding: 0.3rem;
  border-radius: 5px;
  font-style: italic;
  color: ${ props => props.isRunning ? '#5ae351' : '#df5353' };
`

export {
  ProxyStatusContainer,
  ProxyStatusItem
}