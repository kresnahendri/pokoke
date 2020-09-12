/* eslint-disable import/no-extraneous-dependencies */
import {renderHook} from "@testing-library/react-hooks";
import {useQuery} from "react-query";

import {GetPokeDetailResponse} from "../hooks/http/poke/pokeModels";
import {useGetPokeDetail} from "../hooks/http/poke/useGetPokeDetail";

const mockPayloadPokeDetailResponse: GetPokeDetailResponse = {
  name: "poketest",
  order: 1,
  sprites: {
    back_default: "/path/to/png",
    back_shiny: "/path/to/png",
    front_default: "/path/to/png",
    front_shiny: "/path/to/png",
    other: {
      dream_world: {
        front_default: "/path/to/png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "poketest",
        url: "http/path/to",
      },
    },
  ],
  moves: [],
  nextUrl: null,
  stats: [],
  weight: 1,
  height: 1,
  base_experience: 1,
};

test("PokeDetail - should get data from API", async () => {
  const pokeName = "poketest";
  const {result, waitForNextUpdate} = renderHook(() =>
    useGetPokeDetail({name: pokeName}),
  );

  expect(result.current.data).toBe(undefined);

  const {result: mockResult} = renderHook(() =>
    useQuery<GetPokeDetailResponse>(
      `Poke_useGetPokeDetail_${pokeName}`,
      () => mockPayloadPokeDetailResponse,
    ),
  );

  await waitForNextUpdate();

  expect(result.current.data).toBe(mockResult.current.data);
});
