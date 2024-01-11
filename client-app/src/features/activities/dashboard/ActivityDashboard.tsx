import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityDashboard = () => {
  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={'6'}>
        {activityStore.selectedActivity && !activityStore.openForm && (
          <ActivityDetails />
        )}
        {(activityStore.selectEdit || activityStore.openForm) && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
