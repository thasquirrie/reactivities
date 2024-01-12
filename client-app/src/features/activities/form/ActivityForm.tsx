import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Activity } from '../../../app/models/activity';

const ActivityForm = () => {
  const {
    activityStore: {
      submitting,
      createActivity,
      updateActivity,
      loadingInitial,
      loadActivity,
    },
  } = useStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    id && loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleFormSubmit = () => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity);
      navigate(`/activities/${activity.id}`);
    } else {
      updateActivity(activity);
      navigate(`/activities/${activity.id}`);
    }
  };

  if (loadingInitial || !activity)
    return <LoadingComponents content='Loading activity...' />;

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleOnChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity?.description}
          name='description'
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity?.category}
          name='category'
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder='Date'
          type='date'
          value={activity?.date}
          name='date'
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder='City'
          value={activity?.city}
          name='city'
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity?.venue}
          name='venue'
          onChange={handleOnChange}
        />
        <Button
          floated='right'
          positive
          type='submit'
          content='Submit'
          loading={submitting}
        />
        <Button
          as={Link}
          to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
