import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from './api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [openForm, setOpenForm] = useState<Boolean>(false);
  const [loading, setLoading] = useState(true);

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await agent.Activities.list();
      setActivities(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <LoadingComponents content='Loading app' />
  ) : (
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
