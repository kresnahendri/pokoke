import React from "react";

import PokeCard from "../components/PokeCard";
import {useGetPokeDetail} from "../hooks/http/poke/useGetPokeDetail";

interface Props {
  name: string;
}

const PokeCardContainer: React.FC<Props> = ({name}) => {
  const {data} = useGetPokeDetail({name});

  return (
    <PokeCard
      name={name}
      image={data?.sprites.other.dream_world.front_default}
      order={data?.order}
      types={data?.types}
    />
  );
};

export default PokeCardContainer;
