import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [openForm, setOpenForm] = useState<Boolean>(false);

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios<Activity[]>({
        method: 'GET',
        url: 'http://localhost:5000/api/activities',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setActivities(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar handleOpenForm={handleOpenForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          openForm={openForm}
          setOpenForm={setOpenForm}
          setActivities={setActivities}
        />
      </Container>
    </>
  );
}

export default App;
