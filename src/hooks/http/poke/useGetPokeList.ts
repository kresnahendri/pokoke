import {useInfiniteQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {Pokemon} from "./pokeModels";
import {GetPokeDetailResponse} from "./useGetPokeDetail";

interface GetPokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
  serializedResults: GetPokeDetailResponse[];
}

interface Args {
  offset?: number;
  limit?: number;
  type_: string;
}

export const useGetPokeList = (
  args: Args = {offset: 0, limit: 12, type_: "all"},
) => {
  const result = useInfiniteQuery<GetPokeDetailResponse[]>(
    "Poke_useGetPokeList",
    (_, nextUrl) => {
      const serializedResult = fetcher<GetPokeListResponse>({
        url:
          nextUrl ||
          `${config.POKE_API_URL}/pokemon?offset=${args.offset}&limit=${args.limit}`,
      }).then((pokeList) => {
        const fetchDetails = pokeList.results.map(({name}) => {
          return fetcher<GetPokeDetailResponse>({
            url: `${config.POKE_API_URL}/pokemon/${name}`,
          });
        });
        return Promise.all(fetchDetails).then((poke) => {
          return poke
            .filter(({types}) => {
              const found = types.find((t) => t.type.name === args.type_);
              return found || args.type_ === "all";
            })
            .map((it) => {
              return {
                ...it,
                nextUrl: pokeList.next,
              };
            });
        });
      });

      return serializedResult;
    },
    {
      refetchOnWindowFocus: false,
      getFetchMore: (last, _) => last[last.length - 1].nextUrl,
      suspense: true,
    },
  );

  return result;
};
