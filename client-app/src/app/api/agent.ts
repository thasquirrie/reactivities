import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

// const responseBody = (response: AxiosResponse) => response.data;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// axios.interceptors.response.use(async (response) => {
//   try {
//     await sleep(1000);
//     return response;
//   } catch (error) {
//     console.log({ error });
//   }
// });

axios.interceptors.response.use(
  (response) =>
    new Promise<AxiosResponse>(async (resolve) => {
      try {
        await sleep(1000);
        resolve(response);
      } catch (error) {
        console.error({ error });
        resolve(response); // You may choose to reject the promise if needed
      }
    })
);

const requests = {
  get: async <T>(url: string) => {
    const { data }: AxiosResponse<T> = await axios.get<T>(url);
    return data;
  },
  post: async <T>(url: string, body: {}) => {
    const { data } = await axios.post<T>(url, body);
    return data;
  },
  patch: async <T>(url: string, body: {}) => {
    const { data } = await axios.patch<T>(url, body);
    return data;
  },
  delete: async <T>(url: string) => {
    const { data } = await axios.delete<T>(url, {
      data: { foo: 'bar' },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post('/activities', activity),
  update: (activity: Activity) =>
    requests.patch(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
