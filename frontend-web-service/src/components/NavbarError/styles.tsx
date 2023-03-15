import styled from "styled-components";
import { Layout, Menu } from "antd";
const { Header } = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  
  .ant-menu-horizontal {
    line-height: 60px;
    border: 0;
    box-shadow: none;
    width: 100vw;
    font-weight: bold;
    font-size: 18px;
  }
`;



export {
  StyledHeader,
}