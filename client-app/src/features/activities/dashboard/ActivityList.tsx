import React from 'react';
import { Activity } from '../../../app/layout/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
  activities: Activity[];
  handleSelectActivity: (activity: Activity) => void;
}

const ActivityList = ({ activities, handleSelectActivity }: Props) => {
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
