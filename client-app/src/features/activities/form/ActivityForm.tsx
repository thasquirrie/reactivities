import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityForm = () => {
  const {
    activityStore: {
      closeForm,
      submitting,
      createActivity,
      updateActivity,
      selectedActivity,
    },
  } = useStore();

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState(initialState);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleFormSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          value={activity?.title}
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
          onClick={closeForm}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
