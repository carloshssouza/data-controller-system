import styled from "styled-components";

interface TooltipContainerProps {
  level: string
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  background: #00000072;
  color: #ffffff;
  padding: 5px;
  border-radius: 3px;
`

export {
  TooltipContainer
}