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
  const isNonType = type_ === "all";

  const result = useInfiniteQuery<GetPokeDetailResponse[]>(
    `Poke_useGetPokeList_${type_}`,
    (_, nextUrl) => {
      if (nextUrl === null) {
        return Promise.resolve([]);
      }

      const url = isNonType
        ? nextUrl ||
          `${config.POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`
        : `${config.POKE_API_URL}/type/${type_}`;

      const serializedResult = fetcher<GetPokeListResponse>({
        url,
      }).then(async (pokeList) => {
        const results = isNonType
          ? pokeList.results
          : pokeList.pokemon.map((it) => it.pokemon);

        const fetchDetails = results.map(({name}) => fetchPokeDetail(name));

        return Promise.all(fetchDetails).then((poke) => {
          const serialized = poke
            .filter(({types}) => {
              const found = types.find((t) => t.type.name === type_);
              return found || isNonType;
            })
            .map((it) => {
              return {
                ...it,
                nextUrl: pokeList.next,
              };
            });

          return isNonType
            ? serialized
            : serialized.slice(nextUrl ? nextUrl - limit : 0, nextUrl || 12);
        });
      });

      return serializedResult;
    },
    {
      refetchOnWindowFocus: false,
      getFetchMore: (last, all) => {
        return isNonType
          ? last[last.length - 1]?.nextUrl || null
          : all.flatMap((x) => x).length + last.length;
      },
    },
  );

  return result;
};
