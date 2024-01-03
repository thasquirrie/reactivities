import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';

interface Props {
  activity: Activity | undefined;
  handleForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
}

const ActivityForm = ({
  activity: selectedActivity,
  handleForm,
  createOrEditActivity,
}: Props) => {
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
    createOrEditActivity(activity);
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
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={handleForm}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
