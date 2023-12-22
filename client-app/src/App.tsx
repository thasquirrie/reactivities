import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Header, HeaderContent, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios({
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
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
      <Button content='Text' />
    </div>
  );
}

export default App;
