import axios from "axios";
import {queryCache, useQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {PromiseX} from "../../../types/common";
import {GetPokeDetailResponse} from "./pokeModels";

interface Args {
  name: string;
}

export const fetchPokeDetail = (name: string) => {
  const source = axios.CancelToken.source();

  const promise = fetcher<GetPokeDetailResponse>({
    url: `${config.POKE_API_URL}/pokemon/${name}`,
    method: "get",
    cancelToken: source.token,
  }) as PromiseX<GetPokeDetailResponse>;

  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export const useGetPokeDetail = ({name}: Args) => {
  const result = useQuery<GetPokeDetailResponse>(
    `Poke_useGetPokeDetail_${name}`,
    () => fetchPokeDetail(name),
    {
      refetchOnWindowFocus: false,
      initialData: () =>
        queryCache.getQueryData(`Poke_useGetPokeDetail_${name}`),
    },
  );

  return result;
};
