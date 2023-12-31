import React, { useState } from 'react';
import { Activity } from '../../../app/layout/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
  activities: Activity[];
  handleSelectActivity: (activity: Activity) => void;
  deleteActivity: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityList = ({
  activities,
  handleSelectActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState('');
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as={'a'}>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    handleSelectActivity(activity);
                  }}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  onClick={() => {
                    setTarget(activity.id);
                    deleteActivity(activity);
                  }}
                  floated='right'
                  content='Delete'
                  color='red'
                  loading={submitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
