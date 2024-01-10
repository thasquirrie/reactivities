import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return activityStore.loadingInitial ? (
    <LoadingComponents content='Loading app' />
  ) : (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          setActivities={setActivities}
        />
      </Container>
    </>
  );
}

export default observer(App);
