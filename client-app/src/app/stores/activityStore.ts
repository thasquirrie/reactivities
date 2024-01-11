import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  openForm = false;
  loading = false;
  loadingInitial = true;
  selectEdit = false;
  submitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split('T')[0];
          this.activityRegistry.set(activity.id, activity);
        });
      });
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
        this.activityRegistry.set(activity.id, activity);
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
        this.activityRegistry.set(activity.id, activity);
        this.openForm = false;
        this.submitting = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  deleteActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.delete(activity.id);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = undefined;
        this.loading = false;
      });
    } catch (error) {
      console.log({ error });
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
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
