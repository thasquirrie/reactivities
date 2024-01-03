import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
  handleOpenForm: () => void;
}

const Navbar = ({ handleOpenForm }: Props) => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Actvities' />
        <Menu.Item>
          <Button onClick={handleOpenForm} positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
