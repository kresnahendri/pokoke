import {useInfiniteQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {Pokemon} from "./pokeModels";

interface GetPokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface Args {
  offset?: number;
  limit?: number;
}

export const useGetPokeList = (args: Args = {offset: 0, limit: 10}) => {
  const result = useInfiniteQuery<GetPokeListResponse>(
    "Poke_useGetPokeList",
    (_, cursor) => {
      return fetcher<GetPokeListResponse>({
        url: `${config.POKE_API_URL}/pokemon`,
        method: "get",
        params: {
          offset: cursor || args.offset || 0,
          limit: args.limit,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      getFetchMore: (_, all) =>
        all.length * (args.limit || 10) + (args.limit || 10),
      suspense: true,
    },
  );

  return result;
};
