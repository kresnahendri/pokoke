/* eslint-disable import/no-extraneous-dependencies */
import {renderHook} from "@testing-library/react-hooks";
import {useInfiniteQuery, useQuery} from "react-query";

import {
  GetPokeDetailResponse,
  GetPokeTypeListResponse,
} from "../src/hooks/http/poke/pokeModels";
import {useGetPokeDetail} from "../src/hooks/http/poke/useGetPokeDetail";
import {useGetPokeList} from "../src/hooks/http/poke/useGetPokeList";
import {useGetPokeTypeList} from "../src/hooks/http/poke/useGetPokeTypeList";

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

const mockPayloadPokeTypeList: GetPokeTypeListResponse = {
  results: [
    {name: "poketest", url: "http://url/to/poketest"},
    {name: "pokedong", url: "http://url/to/pokedong"},
    {name: "pokeaja", url: "http://url/to/pokeaja"},
  ],
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

test("PokeList - should get data from API", async () => {
  const type_ = "dragon";

  const {result, waitForNextUpdate} = renderHook(() => useGetPokeList({type_}));

  expect(result.current.data).toBe(undefined);

  const {result: mockResult} = renderHook(() =>
    useInfiniteQuery<GetPokeDetailResponse[]>(
      `Poke_useGetPokeList_${type_}`,
      () => [mockPayloadPokeDetailResponse, mockPayloadPokeDetailResponse],
    ),
  );

  await waitForNextUpdate();

  expect(result.current.data).toBe(mockResult.current.data);
});

test("PokeTypeslist - should get data from API", async () => {
  const {result, waitForNextUpdate} = renderHook(() => useGetPokeTypeList());

  expect(result.current.data).toBe(undefined);

  const {result: mockResult} = renderHook(() =>
    useQuery<GetPokeTypeListResponse>(
      "Poke_useGetPokeTypeList",
      () => mockPayloadPokeTypeList,
    ),
  );

  await waitForNextUpdate();

  expect(result.current.data).toBe(mockResult.current.data);
});
