import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

class ActivityStore {
  activityRegistry = new Map<string, Activity>();
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
      const activities = await agent.Activities.list();
      console.log({ activities });
      runInAction(() => {
        activities.forEach((activity) => {
          this.setActivity(activity);
        });
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log({ error });
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    // this.setLoadingInitial(true);
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);

      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);

        return activity;
      } catch (error) {
        console.log({ error });
        this.setLoadingInitial(false);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  toggleSelectEdit = () => {
    this.selectEdit = !this.selectEdit;
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

  deleteActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.delete(activity.id);
      runInAction(() => {
        this.activityRegistry.delete(activity.id);
        // this.selectedActivity = undefined;
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

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }
}

export default ActivityStore;
