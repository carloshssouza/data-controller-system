import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { StyledHeader } from './styles';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate()

  const notifyError = (message: string) => toast.error(message);

  const logoutUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/logout`, config)
      if (response.status !== 200) {
        throw new Error('Logout failed')
      } else {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      notifyError(error.message)
    }
  }


  const userMenu = (
    <Menu>
      <Menu.Item key="1">My Account</Menu.Item>
      <Menu.Item key="2" onClick={logoutUser}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
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
      <ToastContainer />
    </StyledHeader>
  );
};

export default Navbar;
