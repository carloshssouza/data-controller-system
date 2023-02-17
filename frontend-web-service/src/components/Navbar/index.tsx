import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #333;
  color: #fff;
  padding: 0 16px;
`;

const NavbarTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 16px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarTitle>My App</NavbarTitle>
      <NavbarLinks>
        <NavbarLink href="/dashboard">Dashboard</NavbarLink>
        <NavbarLink href="/api">APIs</NavbarLink>
        <LogoutButton>Logout</LogoutButton>
      </NavbarLinks>
    </NavbarContainer>
  );
}

export default Navbar;