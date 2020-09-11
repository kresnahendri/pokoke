import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type PokeDetailParam = {name: string};

type ParamList = {
  PokeList: undefined;
  PokeDetail: PokeDetailParam;
};

// PokeList
export type PokeListRoute = RouteProp<Record<string, undefined>, "PokeList">;
export type PokeListNavigation = StackNavigationProp<ParamList, "PokeList">;

// PokeDetail
export type PokeDetailRoute = RouteProp<
  Record<string, PokeDetailParam>,
  "PokeDetail"
>;
export type PokeDetailNavigation = StackNavigationProp<ParamList, "PokeDetail">;
