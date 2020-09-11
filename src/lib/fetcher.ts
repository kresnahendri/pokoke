import Axios, {AxiosRequestConfig} from "axios";

export const fetcher = async <T>(config?: AxiosRequestConfig): Promise<T> => {
  return Axios(config || {method: "get"}).then((res) => res.data);
};
