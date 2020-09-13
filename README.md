# Pokóke

Pokedex clone using React and Typescript

## Demo

- Web: https://pokoke.vercel.app/
- Expo: https://expo.io/@kresnahendri/pokoke

If you want to run expo app, pleas install expo app client in your smartphone

- Android: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en
- iOS: https://apps.apple.com/us/app/expo-client/id982107779

## Tools

- react
- react-native
- typescript
- expo
- react-query
- react-navigation
- react-native-web (out of the box)

## How to run locally

Prerequisites:

- install node + yarn + npx
- install expo-cli

```bash
yarn          # install deps
yarn ios      # for ios emulator
yarn web      # for web
yarn android  # for android simulator
yarn start    # you will be provided options to run the app
```

## Project structure

```bash
- assets        # for all static assets
- components    # all basic and shared components
- contants      # the contants of the app
- containers    # components that have been related with data (stateful, remote API)
- hooks         # all hooks services like http handler and dom handler, all provided as hooks
- lib           # common lib like fetcher as axios abstration
- navigations   # all navigations setup, backed by react-navigation
- screens       # all screens in this app
- types         # generic, global additional for type in typescript
- config.ts     # common config for this app
```

## react-native-web (RNW)

So much cool, you can build rect-native and react web in the same code base, using react-native component as default. RNW will translate your react-native code to dom out of the box. But still, there are some drawbacks that you have to get, for example:

- react-navigation is collaborated with RNW, navigation work fine for simple routing, but you cannot use native feature like back with gesture, in scroll position after back from stack screen, no path for stack nav, etc.

- You must do tricky way to handle responsiveness of screen in website case. as you know, if you use general dom, media-query is so easy.

## Infinite scroll using react-query

Using react-query we can use `useInfiniteQuery`. It's very handy use, similar like common `useQuery` but data is provider grouped by page/cursor. Somehow in `react-native-web`, `FlatList` component has some glitch in `onEndReached` functionality. the workaround is we need to listen window scroll height and position. In this project I use my custom hooks `useScrollTreshold`.

## Pokeapi

This API is so much "fun" 😜. To get list of pokemon and the details you need to call API several times. So, we have to decide a good way to provide data in our app. For example.

### How to get pokemon detail list

Fetch pokemon list, and surprisingly, you will only get `name` as real value, for the rest of data you need to fetch the detail to another endpoint. let say if we will load 20 pokemon data, so you will hit api 21 in total. 1 for the list and 20 for the details.

### Get pokemon list with filter type

Filter pokemon list based on their type. And... I'm didn't found how to filter using `type` query params. 
There is another way, you can hit `/type/<type_name>`, but.. you will get pokemon data as a total (not paginated). So, as far as I can filtering data based on type is done in front end it self (you can see in `useGetPokeList.ts` file).
Maybe, pokeapi should create something like this `/pokemon?type=dragon` 😁. So litte bit tricky to fetch all result and paginated. I use `/pokemon` of non-typed list and `/type/<type_name>` for typed list. for type list I paginate based on value of limit argument.

## Testing (\_\_test\_\_)

There's is 2 types of testing, that is `Component` and `Hooks`. component just to snapshot the dom because most of validation component props has be done with typescript typing. for hooks (fetching API) I use `@testing-library/react-hooks` for expect the result. `react-query` focus on keyquery of the request. So, mock data just enough to match the keyquery and result data structure and type.
