import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"]; //axios only works with lowercase headers
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response! as AxiosResponse;
    switch (status) {
      case 400:
        console.log(data.errors);
        if (data.errors) {
          const modalStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        router.navigate("/not-found", { state: { error: data } });
        break;
      case 405:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get404Error: () => requests.get("buggy/notfound"),
  get400Error: () => requests.get("buggy/badrequest"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get500Error: () => requests.get("buggy/servererror"),
  getValidationError: () => requests.post("buggy/validationerror", {}),
};

const Cart = {
  get: () => requests.get("cart"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number) =>
    requests.del(`cart?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  current: () => requests.get("account/currentuser"),
  login: (credentials: { email: string; password: string }) =>
    requests.post("account/login", credentials),
  register: (credentials: { email: string; password: string }) =>
    requests.post("account/register", credentials),
};

const agent = {
  Catalog,
  TestErrors,
  Cart,
  Account,
};

export default agent;
