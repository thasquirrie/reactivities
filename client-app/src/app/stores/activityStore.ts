import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  openForm = false;
  loading = false;
  loadingInitial = false;
  selectEdit = false;
  submitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      this.activities = await agent.Activities.list();

      this.setLoadingInitial(false);
    } catch (error) {
      console.log({ error });
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (activity: Activity) => {
    this.selectedActivity = activity;
  };

  toggleSelectEdit = () => {
    this.selectEdit = !this.selectEdit;
  };

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  };

  handleOpenForm = (activity?: Activity) => {
    // activity ? this.selectActivity(activity) : this.cancelSelectActivity();
    this.selectEdit = false;
    this.openForm = true;
  };

  closeForm = () => {
    this.openForm = false;
  };

  createActivity = async (activity: Activity) => {
    this.submitting = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.openForm = false;
        this.submitting = false;
      });
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.submitting = false;
      });
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
}

// class ActivityStore {
//   title = 'Hello from MobX';

//   constructor() {
//     makeObservable(this, {
//       title: observable,
//       setTitle: action,
//     });
//   }

//   setTitle = () => {
//     this.title = this.title + '!';
//   };
// }

export default ActivityStore;
