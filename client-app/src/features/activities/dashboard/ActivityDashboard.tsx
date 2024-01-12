import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityFilter from './ActivityFilter';

const ActivityDashboard = () => {
  const {
    activityStore: { loadActivities, activityRegistry, loadingInitial },
  } = useStore();

  useEffect(() => {
    activityRegistry.size <= 1 && loadActivities();
  }, [loadActivities, activityRegistry]);

  return loadingInitial ? (
    <LoadingComponents content='Loading activities...' />
  ) : (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={'6'}>
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
