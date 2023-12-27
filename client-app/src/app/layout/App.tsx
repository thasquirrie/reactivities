import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Header, List } from 'semantic-ui-react';
import { Activity } from './models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

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
    <div>
      <Header as='h2' icon={'users'} content='Reactivities' />
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
      <Button content='Text' />
    </div>
  );
}

export default App;
