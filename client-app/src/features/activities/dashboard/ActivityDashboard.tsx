import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import agent from '../../../app/api/agent';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const ActivityDashboard = ({ activities, setActivities }: Props) => {
  const { activityStore } = useStore();
  // const [selectedActivity, setSelectedActivity] = useState<
  //   Activity | undefined
  // >(undefined);

  // const [selectEdit, setSelectedEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const handleSelectActivity = (activity: Activity) => {
  //   setSelectedActivity(activity);
  //   selectEdit && setSelectedEdit(!selectEdit);
  //   openForm && setOpenForm(!openForm);
  // };

  // const handleUnselectActivity = () => {
  //   setSelectedActivity(undefined);
  // };

  // const handleEditActivity = () => {
  //   setSelectedEdit(!selectEdit);
  // };

  // const handleForm = () => {
  //   setSelectedEdit(false);
  //   setOpenForm(false);
  //   setSelectedActivity(undefined);
  // };

  // const createOrEditActivity = async (activity: Activity) => {
  //   setSubmitting(true);

  //   if (activity.id) {
  //     await agent.Activities.update(activity);
  //     setActivities([
  //       ...activities.filter(
  //         (filteredActivity) => filteredActivity.id !== activity.id
  //       ),
  //       activity,
  //     ]);
  //   } else {
  //     activity.id = uuid();
  //     await agent.Activities.create(activity);
  //     setActivities([...activities, activity]);
  //   }

  //   setSelectedEdit(false);
  //   setOpenForm(false);
  //   setSelectedActivity(activity);
  //   setSubmitting(false);
  // };

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
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width={'6'}>
        {activityStore.selectedActivity && !activityStore.openForm && (
          <ActivityDetails />
        )}
        {(activityStore.selectEdit || activityStore.openForm) && (
          // <ActivityForm activity={selectedActivity} />
          <ActivityForm
            activity={activityStore.selectedActivity}
            handleForm={() => activityStore.handleOpenForm()}
            // createOrEditActivity={createOrEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
