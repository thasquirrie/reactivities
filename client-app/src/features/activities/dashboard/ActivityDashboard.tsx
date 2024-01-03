import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

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
}: // selectedActivity,
// selectActivity,
Props) => {
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

  console.log({ selectEdit, selectedActivity });

  return (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
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
          <ActivityForm activity={selectedActivity} handleForm={handleForm} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
