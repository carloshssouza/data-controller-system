import styled from "styled-components"
import { Button } from "antd"

interface IStyledButton {
  isActive: boolean
  disabled: boolean
}

const StyledButton = styled(Button) <IStyledButton>`
  background: ${(props) => {
    if (props.isActive && !props.disabled) {
      return '#b6b83b !important'
    } else if(props.isActive && !props.disabled) {
      return '#4f5023 !important'
    } else if (!props.isActive && !props.disabled) {
      return '#874ccb !important'
    } else if (!props.isActive && props.disabled) {
      return '#543d6e !important'
    }
  }
  };
  border: none;
  font-weight: bold;
  color: white;
  margin: 1rem 0 1rem 0;
`

export {
  StyledButton
}