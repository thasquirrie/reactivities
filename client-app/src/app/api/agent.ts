import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/route';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

// const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

axios.interceptors.response.use(
  async <T>(response: AxiosResponse<T>) => {
    console.log({ response });
    // await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          router.navigate('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('unauthorised');
        break;
      case 403:
        toast.error('forbidden');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate('/server-error');
        break;
    }
    return Promise.reject(error);
  }
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
  create: (activity: Activity) => requests.post('/activitiess', activity),
  update: (activity: Activity) =>
    requests.patch(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;

// import axios, { AxiosResponse } from 'axios';
// import { Activity } from '../models/activity';

// axios.defaults.baseURL = 'http://localhost:5000/api';

// // const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

// // axios.interceptors.response.use(async (response) => {
// //   try {
// //     await sleep(1000);
// //     return response;
// //   } catch (error) {
// //     console.log({ error });
// //   }
// // });

// axios.interceptors.response.use(
//   (response) =>
//     new Promise<AxiosResponse>(async (resolve) => {
//       try {
//         await sleep(1000);
//         resolve(response);
//       } catch (error) {
//         console.error({ error });
//         resolve(response); // You may choose to reject the promise if needed
//       }
//     })
// );

// const requests = {
//   get: async <T>(url: string) => {
//     const { data }: AxiosResponse<T> = await axios.get<T>(url);
//     return data;
//   },
//   post: async <T>(url: string, body: {}) => {
//     const { data } = await axios.post<T>(url, body);
//     return data;
//   },
//   patch: async <T>(url: string, body: {}) => {
//     const { data } = await axios.patch<T>(url, body);
//     return data;
//   },
//   delete: async <T>(url: string) => {
//     const { data } = await axios.delete<T>(url, {
//       data: { foo: 'bar' },
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return data;
//   },
// };

// const Activities = {
//   list: () => requests.get<Activity[]>('/activities'),
//   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
//   create: (activity: Activity) => requests.post('/activities', activity),
//   update: (activity: Activity) =>
//     requests.patch(`/activities/${activity.id}`, activity),
//   delete: (id: string) => requests.delete(`/activities/${id}`),
// };

// const agent = {
//   Activities,
// };

// export default agent;
