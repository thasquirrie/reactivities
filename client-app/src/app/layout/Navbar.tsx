import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const Navbar = () => {
  const { activityStore } = useStore();

  console.log({ activityStore });

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
          <Button
            onClick={() => activityStore.handleOpenForm()}
            positive
            content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
