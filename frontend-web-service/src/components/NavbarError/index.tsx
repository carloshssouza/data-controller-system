import { Layout, Menu, Dropdown, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { StyledHeader } from './styles';

const { Header } = Layout;

const NavbarError = () => {
  return (
    <Button>
      <Link to="/login">Voltar</Link>
    </Button>
  );
};

export default NavbarError;
