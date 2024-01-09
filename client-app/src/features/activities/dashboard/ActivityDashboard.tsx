import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { v4 as uuid } from 'uuid';
import agent from '../../../app/layout/api/agent';

interface Props {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  openForm: Boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ActivityDashboard = ({
  activities,
  openForm,
  setOpenForm,
  setActivities,
}: Props) => {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [selectEdit, setSelectedEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    selectEdit && setSelectedEdit(!selectEdit);
    openForm && setOpenForm(!openForm);
  };

  const handleUnselectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleEditActivity = () => {
    setSelectedEdit(!selectEdit);
  };

  const handleForm = () => {
    setSelectedEdit(false);
    setOpenForm(false);
    setSelectedActivity(undefined);
  };

  const createOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);

    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities([
        ...activities.filter(
          (filteredActivity) => filteredActivity.id !== activity.id
        ),
        activity,
      ]);
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity);
      setActivities([...activities, activity]);
    }

    setSelectedEdit(false);
    setOpenForm(false);
    setSelectedActivity(activity);
    setSubmitting(false);
  };

  const deleteActivity = async (activity: Activity) => {
    setSubmitting(true);

    await agent.Activities.delete(activity.id);
    setActivities([
      ...activities.filter(
        (filteredActivity) => filteredActivity.id !== activity.id
      ),
    ]);
    setSubmitting(false);
  };

  return (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width={'6'}>
        {selectedActivity && !selectEdit && (
          <ActivityDetails
            activity={selectedActivity}
            handleUnselectActivity={handleUnselectActivity}
            handleEditActivity={handleEditActivity}
            selectEdit={selectEdit}
          />
        )}
        {(selectEdit || openForm) && (
          // <ActivityForm activity={selectedActivity} />
          <ActivityForm
            activity={selectedActivity}
            handleForm={handleForm}
            createOrEditActivity={createOrEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
