import {useQuery} from "react-query";

import config from "../../../config";
import {fetcher} from "../../../lib/fetcher";
import {PokeMove, PokeSprite, PokeType} from "./pokeModels";

interface Args {
  name: string;
}

interface GetPokeDetailResponse {
  name: string;
  order: number;
  sprites: PokeSprite[];
  types: PokeType[];
  moves: PokeMove[];
}

export const useGetPokeDetail = ({name}: Args) => {
  const result = useQuery<GetPokeDetailResponse>(
    `Poke_useGetPokeDetail_${name}`,
    () =>
      fetcher<GetPokeDetailResponse>({
        url: `${config.POKE_API_URL}/pokemon/${name}`,
        method: "get",
      }),
    {refetchOnWindowFocus: false},
  );

  return result;
};
