import {useInfiniteQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {GetPokeDetailResponse, GetPokeListResponse} from "./pokeModels";
import {fetchPokeDetail} from "./useGetPokeDetail";

interface Args {
  offset?: number;
  limit?: number;
  type_: string;
}

export const useGetPokeList = ({
  offset = 0,
  limit = 12,
  type_ = "all",
}: Args) => {
  const defaultUrl = `${config.POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`;

  const result = useInfiniteQuery<GetPokeDetailResponse[]>(
    `Poke_useGetPokeList_${type_}`,
    (_, nextUrl) => {
      if (nextUrl === null) {
        return Promise.resolve([]);
      }
      const serializedResult = fetcher<GetPokeListResponse>({
        url: nextUrl || defaultUrl,
      }).then(async (pokeList) => {
        const fetchDetails = pokeList.results.map(({name}) =>
          fetchPokeDetail(name),
        );

        return Promise.all(fetchDetails).then((poke) => {
          const serialized = poke
            .filter(({types}) => {
              const found = types.find((t) => t.type.name === type_);
              return found || type_ === "all";
            })
            .map((it) => {
              return {
                ...it,
                nextUrl: pokeList.next,
              };
            });

          return serialized;
        });
      });

      return serializedResult;
    },
    {
      refetchOnWindowFocus: false,
      getFetchMore: (last, _) => last[last.length - 1]?.nextUrl,
    },
  );

  return result;
};
