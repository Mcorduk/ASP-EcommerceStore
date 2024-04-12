import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        toast.error("Not Found");
        break;
      case 500:
        toast.error("Server Error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get404Error: () => requests.get("buggy/notfound"),
  get400Error: () => requests.get("buggy/badrequest"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get500Error: () => requests.get("buggy/servererror"),
  getValidationError: () => requests.post("buggy/validationerror", {}),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
