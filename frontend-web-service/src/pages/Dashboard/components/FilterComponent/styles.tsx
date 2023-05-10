import { Card, Radio } from "antd";
import styled from "styled-components";

const FilterContainer = styled.div`
  position: relative;
`

const CardFilter = styled(Card)`
  width: 300px;
  background: #4c5c6c97;
  color: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  font-weight: bold;
  text-align: center;

  .ant-radio-wrapper {
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .button {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
    Button {
      border: none;
      font-weight: bold;
    }
  }
`

export {
  FilterContainer,
  CardFilter
}