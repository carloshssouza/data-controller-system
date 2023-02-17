import React from 'react';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

const LogoutButton = styled(Button)`
  margin-right: 24px;
`;

export const NavBar = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard">Dashboard</Menu.Item>
        <Menu.Item key="apis">APIs</Menu.Item>
      </Menu>
      <LogoutButton type="primary" danger>Logout</LogoutButton>
    </Header>
  );
}

