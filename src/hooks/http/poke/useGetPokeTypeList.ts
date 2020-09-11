import {useQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {Pokemon} from "./pokeModels";

interface GetPokeTypeListResponse {
  results: Pokemon[];
}

export const useGetPokeTypeList = () => {
  const result = useQuery<GetPokeTypeListResponse>(
    "Poke_useGetPokeTypeList",
    () =>
      fetcher<GetPokeTypeListResponse>({
        url: `${config.POKE_API_URL}/type`,
        method: "get",
      }),
    {refetchOnWindowFocus: false},
  );

  return result;
};
