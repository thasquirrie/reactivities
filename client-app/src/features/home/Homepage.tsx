import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';

const Homepage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header as={'h2'} inverted content='Welcome to Reactivities' />
        <Button as={Link} to='/activities' inverted size='huge'>
          Take me to Activities!
        </Button>
      </Container>
    </Segment>
  );
};

export default Homepage;
