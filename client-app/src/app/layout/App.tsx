import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import Homepage from '../../features/home/Homepage';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? (
        <Homepage />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
