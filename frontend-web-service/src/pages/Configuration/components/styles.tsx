import styled from "styled-components"
import { Button } from "antd"

interface IStyledButton {
  typebutton: string
  disabled: boolean
}

const StyledButton = styled(Button)<IStyledButton>`
  background: ${(props) => {
      if (props.typebutton === 'start' && !props.disabled) {
        return '#874ccb !important'
      } else if (props.typebutton === 'stop' && !props.disabled) {
        return '#b89f3b !important'
      } else if (props.typebutton === 'start' && props.disabled) {
        return '#482b6a !important'
      } else if (props.typebutton === 'stop' && props.disabled) {
        return '#4f5023 !important'
      }
    }
  };
  border: none;
  font-weight: bold;
  color: white;
  margin: 1rem 0.5rem 1rem 0 !important;
  :hover {
    background: ${(props) => {
      if (props.typebutton === 'start' && !props.disabled) {
        return '#a682d0 !important'
      } else if (props.typebutton === 'stop' && !props.disabled) {
        return '#d5be60 !important'
      } else if (props.typebutton === 'start' && props.disabled) {
        return '#482b6a !important'
      } else if (props.typebutton === 'stop' && props.disabled) {
        return '#4f5023 !important'
      }
    }
  };
  }
`

export {
  StyledButton
}