import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { v4 as uuid } from 'uuid';

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

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    selectEdit && setSelectedEdit(!selectEdit);
    openForm && setOpenForm(!openForm);
    console.log({ selectEdit });
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

  const createOrEditActivity = (activity: Activity) => {
    console.log('ID:', activity.id, { activity });
    activity.id
      ? setActivities([
          ...activities.filter(
            (filteredActivity) => filteredActivity.id !== activity.id
          ),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setSelectedEdit(false);
    setOpenForm(false);
    setSelectedActivity(activity);
  };

  const deleteActivity = (activity: Activity) => {
    setActivities([
      ...activities.filter(
        (filteredActivity) => filteredActivity.id !== activity.id
      ),
    ]);
  };

  return (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          deleteActivity={deleteActivity}
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
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
