import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Response } from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { StyledHeader } from './styles';
import { logout } from '../../api/services/Auth';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate()

  const notifyError = (message: string) => toast.error(message);

  const logoutUser = async () => {
    const { response, error } = await logout() as Response
    if (error) {
      notifyError(response.data.message)
    } else {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate('/user')}>My Account</Menu.Item>
      <Menu.Item key="2" onClick={logoutUser}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[
        window.location.pathname === '/dashboard' ? '1' :
          window.location.pathname === '/api' ? '2' :
            window.location.pathname === '/config' ? '3' : '1'
      ]}>
        <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/api">API</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/config">Configuration</Link></Menu.Item>
        <Menu.Item key="4" style={{ marginLeft: 'auto' }}>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <UserOutlined /> User
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <ToastContainer theme='dark' />
    </StyledHeader>
  );
};

export default Navbar;
