import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';

interface Props {
  // selectedActivity: Activity;
  activity: Activity;
  handleUnselectActivity: () => void;
  handleEditActivity: () => void;
  selectEdit: Boolean;
}

const ActivityDetails = ({
  activity,
  handleUnselectActivity,
  handleEditActivity,
  selectEdit,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={'2'}>
          <Button
            onClick={() => handleEditActivity()}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => {
              handleUnselectActivity();
              selectEdit && handleEditActivity();
            }}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
